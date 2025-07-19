// Bad Practice: Violates SRP
class User {
    constructor(public name: string, public email: string) {}

    save() {
        // Save user to database
    }

    sendEmail(message: string) {
        // Send email to user
    }
}

// Good Practice: Follows SRP
class UserGood {
    constructor(public name: string, public email: string) {}
}

class UserRepository {
    save(user: UserGood) {
        // Save user to database
    }
}

class EmailService {
    sendEmail(email: string, message: string) {
        // Send email
    }
}
