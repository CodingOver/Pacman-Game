// Create Pacman Game Player
class Pacman {
    constructor(x, y, width, height, speed) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.speed = speed
        this.direction = DIRECTION_RIGHT
        this.currentFrame = 1
        this.frameCount = 7

        setInterval(() => {
            this.changeAnimations()

        }, 100)
    }

    moveProcess() {
        this.changeDirectionifPossible()
        this.moveForward()
        if (this.checkCollision()) {
            this.moveBackwords()
        }
    }

    eat() {

    }

    moveBackwords() {
        switch (this.direction) {
            case DIRECTION_RIGHT:
                this.x -= this.speed
                break;
            case DIRECTION_UP:
                this.y += this.speed
                break;
            case DIRECTION_LEFT:
                this.x += this.speed
                break;
            case DIRECTION_BOTTOM:
                this.y -= this.speed
                break;
        }
    }

    moveForward() {
        switch (this.direction) {
            case DIRECTION_RIGHT:
                this.x += this.speed
                break;
            case DIRECTION_UP:
                this.y -= this.speed
                break;
            case DIRECTION_LEFT:
                this.x -= this.speed
                break;
            case DIRECTION_BOTTOM:
                this.y += this.speed
                break;
        }
    }

    checkCollision() {
        let isCollided = false
        if (
            map[this.getMapY()][this.getMapX()] == 1 ||
            map[this.getMapYRightSide()][this.getMapX()] == 1 ||
            map[this.getMapY()][this.getMapXRightSide()] == 1 ||
            map[this.getMapYRightSide()][this.getMapXRightSide()] == 1
        ) {
            return true
        }
        return false
    }

    checkGhostCollision() {

    }

    changeDirectionifPossible() {

    }

    changeAnimations() {
        this.currentFrame = this.currentFrame == this.frameCount ? 1 : this.currentFrame + 1
    }

    draw() {
        ctx.save()
        ctx.translate(
            this.x + oneBlockSize / 2,
            this.y + oneBlockSize / 2
        )

        ctx.rotate((this.direction * 90 * Math.PI) / 180)

        ctx.translate(
            -this.x - oneBlockSize / 2,
            -this.y - oneBlockSize / 2
        )

        ctx.drawImage(
            pacmanFrames,
            (this.currentFrame - 1) * oneBlockSize,
            0,
            oneBlockSize,
            oneBlockSize,
            this.x,
            this.y,
            this.width,
            this.height
        )

        ctx.restore()
    }

    getMapX() {
        return parseInt(this.x / oneBlockSize)
    }

    getMapY() {
        return parseInt(this.y / oneBlockSize)
    }

    getMapXRightSide() {
        return parseInt((this.x + 0.9999 * oneBlockSize) / oneBlockSize)
    }

    getMapYRightSide() {
        return parseInt((this.y + 0.9999 * oneBlockSize) / oneBlockSize)
    }
}

