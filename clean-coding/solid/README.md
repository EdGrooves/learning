# SOLID Principles

## S - Single Responsibility Principle (SRP)

A class should have only one reason to change, meaning it should only have one job or responsibility. This makes code easier to maintain, test, and understand.

**Example:**
A class that handles user authentication should not also be responsible for logging user activity. These responsibilities should be separated into different classes.

## O - Open/Closed Principle (OCP)

Software entities (classes, modules, functions, etc.) should be open for extension, but closed for modification. This means you should be able to add new functionality without changing existing code.

**Example:**
Instead of modifying a class to add new behavior, you can extend it or use interfaces/polymorphism to introduce new features.
