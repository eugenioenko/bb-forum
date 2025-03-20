# BB Forum - Minimalistic Bulletin Board Forum

### > [Live Preview Here](https://bbforum.yy-dev.top)

BB Forum is a work-in-progress minimalistic bulletin board that allows users to create, share, and discuss topics in a user-friendly environment. The forum emphasizes simplicity and usability, making it easy for users to engage with content.

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User-Friendly Interface**: A clean and minimalistic design prioritizing ease of use and intuitive navigation.
- **Post and Comment**: Users can create threads, post topics, and engage in discussions by commenting on posts.
- **Custom Themes**: Supports light and dark themes, allowing users to switch between themes for a personalized experience.
- **Server-Side Rendering**: Optimized page loading enhances performance and improves SEO, ensuring your content is discoverable.
- **State Management**: Utilizes lightweight state management with React hooks and Zustand for efficient data handling.
- **Responsive Design**: The layout adapts to various screen sizes, ensuring accessibility on both desktop and mobile devices.

## Requirements

To run this project locally, you need to have the following installed:

- **pnpm**: A fast, disk space-efficient package manager for JavaScript.

## Getting Started

Follow these steps to set up your local development environment:

1. Clone the repository:

   ```bash
   git clone git@github.com:eugenioenko/bb-forum.git
   cd bb-forum
   ```

2. Run the following commands:
   ```bash
    make setup
   ````
   `setup` command will cleanup database migrations, install dependencies, initialize prisma and start the server

3. Open your browser and navigate to [http://localhost:4200](http://localhost:4200) to see the result.

## Usage

Once the application is running, you can:

- **Create an Account**: Register a new account to start participating in discussions.
- **Browse Topics**: View existing topics and read through discussions.
- **Post New Topics**: Share your thoughts by creating new discussion threads.
- **Comment on Posts**: Engage with other users by leaving comments on their posts.

## Technologies

BB Forum is built with the following technologies:

- **React**: A JavaScript library for building user interfaces.
- **Next.js**: A React framework for server-side rendering.
- **Prisma**: An ORM for managing database interactions.
- **Zustand**: A small, fast state management solution for React applications.
- **Docker**: For containerization of services.

## Contributing

Contributions are welcome! If you have suggestions or improvements, please fork the repository and submit a pull request.

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/YourFeature`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/YourFeature`.
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
