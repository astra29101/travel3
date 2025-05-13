
# Aptos Token Transfer dApp

A React-based dApp that:
- Connects to Petra Wallet in the browser
- Lets a user input another Aptos wallet address
- Simulates sending APT tokens to the provided wallet address
- Uses the Aptos Devnet for development and testing

## Features
- Wallet connection with Petra Wallet
- APT token transfer form
- Transaction status display
- Responsive UI design

## Development
This project runs on port 8080 in development mode.

## Important Note
The package.json file needs a 'build:dev' script for Lovable to build the project. Please add:
```json
"build:dev": "vite build --mode development"
```
to the scripts section of your package.json file.
