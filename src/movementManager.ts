import type { TComponent } from './types.ts'

export class MovementManager {
  public blocks: TComponent[] = []
  private currentFocus: TComponent | null = null

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
      nextBlock = this.findClosestBlock(currentRect, 'left')
    } else if (key === 'j') {
      nextBlock = this.findClosestBlock(currentRect, 'down')
    } else if (key === 'k') {
      nextBlock = this.findClosestBlock(currentRect, 'up')
    } else if (key === 'l') {
      nextBlock = this.findClosestBlock(currentRect, 'right')
    }

    if (nextBlock) {
      this.focusBlock(nextBlock)
    }
  }

  findClosestBlock(currentRect: DOMRect, direction: 'left' | 'right' | 'up' | 'down'): TComponent | null {
    let closestBlock: TComponent | null = null
    let minDistance = Infinity

    this.blocks.forEach(block => {
      if (block === this.currentFocus) return

      const rect = block.$el.getBoundingClientRect()
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