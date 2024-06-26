import { query } from 'app/utils/dom';


export const mainCanvas: HTMLCanvasElement = query('.js-mainCanvas') as HTMLCanvasElement;
// @ts-ignore
window['mainCanvas'] = mainCanvas;
// mainCanvas.width = mainCanvas.height = 512;
export const mainContext = require2dContext(mainCanvas);
// mainContext.imageSmoothingEnabled = false;
// @ts-ignore
window['mainContext'] = mainContext;

export function require2dContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
    const context = canvas.getContext('2d');
    if (!context) {
        throw new Error('Failed to get context');
    }
    return context;
}

export function createCanvas(width: number, height: number, classes = ''): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.className = classes;
    canvas.width = width;
    canvas.height = height;
    return canvas;
}

export function createCanvasAndContext(width: number, height: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
    const canvas = createCanvas(width, height);
    const context = require2dContext(canvas);
    return [canvas, context];
}

/**
 * Safari (and possibly other browsers) will not draw canvases if the source
 * rectangle has any parts outside the dimensions of the actual canvas, so this
 * method takes arbitrary rectangles and then modifies them to only draw the
 * part that overlaps with the canvas.
 */
export function drawCanvas(
    context: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    {x, y, w, h}: Rect,
    {x: tx, y: ty, w: tw, h: th}: Rect
): void {
    if (w > canvas.width - x) {
        const dx = w - (canvas.width - x);
        w += dx;
        tw += dx;
    }
    if (h > canvas.height - y) {
        const dy = h - (canvas.height - y);
        h += dy;
        th += dy;
    }
    if (x < 0) {
        tx -= x;
        tw += x
        w += x;
        x = 0;
    }
    if (y < 0) {
        ty -= y;
        th += y;
        h += y;
        y = 0;
    }
    if (w > 0 && h > 0){
        context.drawImage(
            canvas,
            x, y,
            w, h,
            tx, ty, tw, th,
        );
    }
}
