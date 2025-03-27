import type { TComponent, PairNubmer } from './types.ts'
import type { Ref } from 'vue'
import { toValue } from 'vue'

export class MovementManager {
  private ref_termEntry: Ref<HTMLElement | null>
  public lineHeight: number = 16
  public blocks: TComponent[] = []
  private currentFocus: TComponent | null = null
  
  constructor(termEntry: Ref<HTMLElement | null>) {
    this.ref_termEntry = termEntry;
  }

  registerBlock(t: TComponent) {
    if (!this.blocks.includes(t)) {
      this.blocks.push(t)
    }
  }

  unregisterBlock(t: TComponent) {
    this.blocks = this.blocks.filter(block => block !== t)
  }

  focusBlock(block: TComponent) {
    if (this.currentFocus!==null) {
      this.currentFocus.unFocus()
    }
    this.currentFocus = block
    this.currentFocus.focus()
  }

  focusBlockByElement(el: HTMLElement) {
    const block = this.blocks.find(b => b.$el === el)
    if (block) {
      this.focusBlock(block)
    }
  }
  
  findFirstBlock() {
    if (this.blocks.length === 0) return
    const first = this.blocks.reduce((x, y) => (x.$el.offsetTop < y.$el.offsetTop) ? x : y, this.blocks[0])
    this.focusBlock(first)
  }

  executeFocusedComponent() {
    if (this.currentFocus !== null) {
      console.log('execute', this.currentFocus.$props.execute)
      this.currentFocus.execute()
    }
  }

  move(key: string) {
    if (this.currentFocus === null) {
      this.findFirstBlock()
      if (this.currentFocus === null) return
    }
    
    const currentRect = this.currentFocus!.$el.getBoundingClientRect()
    let nextBlock: TComponent | null = null

    if (key === 'h') {
      nextBlock = this.findNext(currentRect, -1);
    } else if (key === 'j') {
      nextBlock = this.findClosestBlock(currentRect, 'down')
    } else if (key === 'k') {
      nextBlock = this.findClosestBlock(currentRect, 'up')
    } else if (key === 'l') {
      nextBlock = this.findNext(currentRect, 1)
    }

    if (nextBlock) {
      this.focusBlock(nextBlock)
    }
  }

  getOneLineRectCenter(rect: DOMRect): PairNubmer {
    // use 'toValue' in case that manager is reactive then ref is unavailable
    const termRect = toValue(this.ref_termEntry)!.getBoundingClientRect() as DOMRect
    //console.log(termRect, rect)
    const h = this.lineHeight;
    
    return {
      x: (rect.left + rect.width) / 2,
      y: (Math.floor((rect.top - termRect.top) / h + 0.5) + 0.5) * h
    }
  }
  
  findNext(currentRect: DOMRect, direction: 1 | -1): TComponent | null {
    const cmp = (a: PairNubmer, b: PairNubmer) => {
      return Math.abs(a.y - b.y) > 1e-5 ? a.y - b.y : a.x - b.x 
    }
    let closest: [PairNubmer, TComponent] | null = null
    const currentPos = this.getOneLineRectCenter(currentRect);

    this.blocks.forEach(block => {
      const rect = block.$el.getBoundingClientRect() as DOMRect
      const pos = this.getOneLineRectCenter(rect)
      if (
        ((direction === 1 && cmp(currentPos, pos) < 0) ||
        (direction === -1 && cmp(currentPos, pos) > 0))
      &&
        (closest === null ||
        (direction === 1 && cmp(closest[0], pos) > 0) ||
        (direction === -1 && cmp(closest[0], pos) < 0))
      ) {
        closest = [pos, block]
      }
    })
    return closest ? closest[1] : null
  }

  findClosestBlock(currentRect: DOMRect, direction: 'left' | 'right' | 'up' | 'down'): TComponent | null {
    let closestBlock: TComponent | null = null
    let minDistance = Infinity

    this.blocks.forEach(block => {
      if (block === this.currentFocus) return

      const rect = block.$el.getBoundingClientRect() as DOMRect
      let distance = Infinity

      if (direction === 'left' && rect.right <= currentRect.left && rect.top < currentRect.bottom && rect.bottom > currentRect.top) {
        distance = currentRect.left - rect.right
      } else if (direction === 'right' && rect.left >= currentRect.right && rect.top < currentRect.bottom && rect.bottom > currentRect.top) {
        distance = rect.left - currentRect.right
      } else if (direction === 'up' && rect.bottom <= currentRect.top && rect.left < currentRect.right && rect.right > currentRect.left) {
        distance = currentRect.top - rect.bottom
      } else if (direction === 'down' && rect.top >= currentRect.bottom && rect.left < currentRect.right && rect.right > currentRect.left) {
        distance = rect.top - currentRect.bottom
      }

      if (distance < minDistance) {
        minDistance = distance
        closestBlock = block
      }
    })

    return closestBlock
  }
}