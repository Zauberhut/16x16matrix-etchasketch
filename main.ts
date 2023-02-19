input.onButtonPressed(Button.A, function () {
    pixel[CurrentPixel] = -1
})
function start () {
    joystick.setJoystick(
    AnalogPin.P1,
    AnalogPin.P2,
    DigitalPin.P12
    )
    joystick.setPullMode(
    PinPullMode.PullNone
    )
    matrix = SmartMatrix.create(
    DigitalPin.P8,
    16,
    16,
    NeoPixelMode.RGB
    )
    pixel = []
    for (let index = 0; index < 256; index++) {
        pixel.push(-1)
    }
    matrix.clear()
    matrix.show()
    x = 7
    y = 7
    LastActiveTime = 0
    TimeOut = 10000
    Color = -1
    AllColors = [
    neopixel.colors(NeoPixelColors.Red),
    neopixel.colors(NeoPixelColors.Orange),
    neopixel.colors(NeoPixelColors.Yellow),
    neopixel.colors(NeoPixelColors.Green),
    neopixel.colors(NeoPixelColors.Blue),
    neopixel.colors(NeoPixelColors.Indigo),
    neopixel.colors(NeoPixelColors.Violet),
    neopixel.colors(NeoPixelColors.Purple),
    neopixel.colors(NeoPixelColors.White)
    ]
}
let CurrentPixelColor = 0
let NewColor = 0
let AllColors: number[] = []
let Color = 0
let TimeOut = 0
let LastActiveTime = 0
let y = 0
let x = 0
let matrix: SmartMatrix.Matrix = null
let CurrentPixel = 0
let pixel: number[] = []
start()
basic.forever(function () {
    NewColor = Math.floor(pins.map(
    Math.constrain(pins.analogReadPin(AnalogPin.P0), 0, 1000),
    0,
    1000,
    0,
    AllColors.length
    ))
    if (Color != NewColor) {
        Color = NewColor
        LastActiveTime = input.runningTime()
    }
    CurrentPixel = y * 16 + x
    if (joystick.getJoystickSW()) {
        LastActiveTime = input.runningTime()
        pixel[CurrentPixel] = Color
    }
    CurrentPixelColor = pixel[CurrentPixel]
    if (CurrentPixelColor >= 0) {
        matrix.Brightness(8)
        matrix.setPixel(x, y, AllColors[CurrentPixelColor])
    } else {
        matrix.setPixel(x, y, neopixel.colors(NeoPixelColors.Black))
    }
    if (joystick.getJoystickValue(joystick.valueType.X) < 330) {
        LastActiveTime = input.runningTime()
        x += -1
    } else if (joystick.getJoystickValue(joystick.valueType.X) > 660) {
        LastActiveTime = input.runningTime()
        x += 1
    }
    x = Math.constrain(x, 0, 15)
    if (joystick.getJoystickValue(joystick.valueType.Y) < 330) {
        LastActiveTime = input.runningTime()
        y += -1
    } else if (joystick.getJoystickValue(joystick.valueType.Y) > 660) {
        LastActiveTime = input.runningTime()
        y += 1
    }
    y = Math.constrain(y, 0, 15)
    if (input.runningTime() - LastActiveTime <= TimeOut) {
        matrix.Brightness(64)
        matrix.setPixel(x, y, AllColors[Color])
    }
    matrix.show()
    basic.pause(200)
})
