const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

canvas.width = innerWidth
canvas.height = innerHeight


class Boundary {
    static width = 40
    static height = 40
    constructor({ position }) {
        this.position = position
        this.width = 40
        this.height = 40
    }
    draw() {
        // Draw a rectangle using canvas
        ctx.fillStyle = "blue"
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

// Create a Pacman Player
class Player {
    constructor({ position, velocity }) {
        this.position = position
        this.velocity = velocity
        this.radius = 15
    }
    draw() {
        // Draw a circle using canvas
        ctx.beginPath()
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = "yellow"
        ctx.fill()
        ctx.closePath()
    }
    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

const boundaries = []
const player = new Player({
    position: {
        x: Boundary.width + Boundary.width / 2,
        y: Boundary.height + Boundary.height / 2
    },
    velocity: {
        x: 0,
        y: 0
    }
})

const keys = {
    top: {
        pressed: false
    },
    right: {
        pressed: false
    },
    bottom: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

let lastKey;

const map = [
    ['-', '-', '-', '-', '-', '-'],
    ['-', ' ', ' ', ' ', ' ', '-'],
    ['-', ' ', '-', '-', ' ', '-'],
    ['-', ' ', ' ', ' ', ' ', '-'],
    ['-', '-', '-', '-', '-', '-'],
]

map.forEach((row, i) => {
    row.forEach((symbol, j) => {
        switch (symbol) {
            case "-":
                boundaries.push(new Boundary({
                    position: {
                        x: Boundary.width * j,
                        y: Boundary.height * i
                    }
                }))
                break;
        }
    })
})

function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    boundaries.forEach((boundary) => {
        boundary.draw()
    })

    player.update()
    player.velocity.y = 0
    player.velocity.x = 0

    if (keys.top.pressed && lastKey === 38) {
        player.velocity.y = -5
    } else if (keys.right.pressed && lastKey === 39) {
        player.velocity.x = 5
    } else if (keys.bottom.pressed && lastKey === 40) {
        player.velocity.y = 5
    } else if (keys.left.pressed && lastKey === 37) {
        player.velocity.x = -5
    }
}

animate()


addEventListener("keydown", ({ keyCode }) => {
    switch (keyCode) {
        // Top
        case 38:
            keys.top.pressed = true
            lastKey = 38
            break;
        // Right
        case 39:
            keys.right.pressed = true
            lastKey = 39
            break;
        // Bottom
        case 40:
            keys.bottom.pressed = true
            lastKey = 40
            break;
        // Left
        case 37:
            keys.left.pressed = true
            lastKey = 37
            break;
    }
})
addEventListener("keyup", ({ keyCode }) => {
    switch (keyCode) {
        // Top
        case 38:
            keys.top.pressed = false
            break;
        // Right
        case 39:
            keys.right.pressed = false
            break;
        // Bottom
        case 40:
            keys.bottom.pressed = false
            break;
        // Left
        case 37:
            keys.left.pressed = false
            break;

    }
})