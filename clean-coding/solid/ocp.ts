// Bad Example: Violates OCP (requires modification for each new shape)
class BadRectangle {
    constructor(public width: number, public height: number) {}
}

class BadCircle {
    constructor(public radius: number) {}
}

function badTotalArea(shapes: (BadRectangle | BadCircle)[]): number {
    let total = 0;
    for (const shape of shapes) {
        if (shape instanceof BadRectangle) {
            total += shape.width * shape.height;
        } else if (shape instanceof BadCircle) {
            total += Math.PI * shape.radius * shape.radius;
        }
        // Adding a new shape requires modifying this function (violates OCP)
    }
    return total;
}

// Example demonstrating the Open/Closed Principle (OCP)

// Base interface for shapes
interface Shape {
    area(): number;
}

// Rectangle class implements Shape
class Rectangle implements Shape {
    constructor(private width: number, private height: number) {}
    area(): number {
        return this.width * this.height;
    }
}

// Circle class implements Shape
class Circle implements Shape {
    constructor(private radius: number) {}
    area(): number {
        return Math.PI * this.radius * this.radius;
    }
}

// AreaCalculator uses the Shape interface, so it is closed for modification but open for extension
class AreaCalculator {
    static totalArea(shapes: Shape[]): number {
        return shapes.reduce((sum, shape) => sum + shape.area(), 0);
    }
}

// Usage example:
const shapes: Shape[] = [new Rectangle(10, 20), new Circle(5)];

console.log(AreaCalculator.totalArea(shapes)); // Outputs the total area of all shapes
