# MERNFOOD

## Project Overview
MERNFOOD is a full-featured food ordering web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It allows users to browse a variety of food items, add them to their cart, place orders, and manage their profiles. The project is designed for scalability, performance, and a seamless user experience.

## Features
- User authentication and registration
- Browse and search food items
- Add/remove items to cart
- Place orders and view order history
- Admin panel for managing products and orders
- Responsive design for mobile and desktop
- Error and success notifications

## Installation
1. **Clone the repository:**
	```powershell
	git clone https://github.com/ManasJ17/MERNFOOD.git
	cd MERNFOOD
	```
2. **Install server dependencies:**
	```powershell
	npm install
	```
3. **Install client dependencies:**
	```powershell
	cd client
	npm install
	```
4. **Configure environment variables:**
	- Create a `.env` file in the root and set up your MongoDB URI and other secrets as needed.
5. **Start the development servers:**
	- In the root folder:
	  ```powershell
	  npm start
	  ```
	- In the `client` folder (in a separate terminal):
	  ```powershell
	  npm start
	  ```

## Usage
1. Open [http://localhost:3000](http://localhost:3000) in your browser.
2. Register or log in as a user.
3. Browse food items, add to cart, and place orders.
4. Admins can log in to manage products and orders.

## Tech Stack
- **Frontend:** React.js, Redux
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Other:** Mongoose, JWT, bcrypt, Axios

## Contribution
Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a new branch (`git checkout -b feature-name`)
3. Commit your changes
4. Push to your branch and open a pull request
5. Ensure your code follows the project's style and passes all tests

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
