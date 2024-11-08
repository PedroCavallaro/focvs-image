export class CanvasHelper {
  private _sizes = {
    width: 400,
    height: 400
  }

  getMeasures(exerciseAmount: number) {
    if (exerciseAmount <= 2) return

    this._sizes = { ...this.sizes, height: 200 }

    return this.sizes
  }

  getCompositePositions({ height, width }: { height: number; width: number }) {
    return {
      [0]: { top: 0, left: 0 },
      [1]: { top: 0, left: width },
      [2]: { top: height, left: 0 },
      [3]: { top: height, left: width }
    }
  }

  getImagesSizeByMuscleAmount(): { [key: number]: typeof this.sizes } {
    return {
      [1]: {
        width: this._sizes.width * 2,
        height: this._sizes.height * 2
      },
      [2]: {
        width: this._sizes.width,
        height: this._sizes.height * 2
      },
      [3]: this.sizes,
      [4]: this.sizes
    }
  }

  getComposite(images: Buffer[]) {
    const mesures = this.getCompositePositions(this._sizes)

    const composite = []

    for (let i = 0; i < images.length; i++) {
      composite.push({
        input: images[i],
        ...mesures[i]
      })
    }

    return composite
  }

  get sizes() {
    return this._sizes
  }
}
