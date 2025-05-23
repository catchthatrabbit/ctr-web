# CTR Web

A modern web application built on top of Docusaurus for managing CTR mining operations, providing real-time statistics, wallet management, and mining configuration tools.

## Features

- Real-time mining pool statistics and monitoring
- Wallet management and tracking
- Mining configuration generator
- Profitability calculator
- Global mining pool network overview
- Mobile-responsive design
- Multi-language support

## Prerequisites

- Node.js >= 18.0
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone https://github.com/catchthatrabbit/ctr-web.git
cd ctr-web
```

1. Install dependencies:

```bash
npm install
# or
yarn install
```

1. Start the development server:

```bash
npm start
# or
yarn start
```

The application will be available at `http://localhost:3000`.

## Development

### Available Scripts

- `npm start` - Start the development server
- `npm build` - Build the production version
- `npm serve` - Serve the production build locally
- `npm lint` - Run ESLint
- `npm lint:fix` - Fix ESLint issues
- `npm format` - Format code with Prettier
- `npm typecheck` - Run TypeScript type checking

### Project Structure

```txt
src/
├── components/    # React components
│   ├── Atoms/     # Basic UI components
│   ├── Molecules/ # Composite components
│   ├── Organisms/ # Complex components
│   ├── Templates/ # Layout components
│   └── Pages/     # Page components
├── hooks/         # Custom React hooks
├── utils/         # Utility functions
├── constants/     # Constants and configurations
├── Api/           # API integration
└── theme/         # Docusaurus theme customization
```

## Building for Production

```bash
npm run build
# or
yarn build
```

The production build will be available in the `build` directory.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Adding new machine to the profitability calculator

1. Add new machine to the `src/constants/machines.ts` file
2. Define machine name (required), hashrate (required) and power consumption (optional)
3. Save and make a [Pull Request](https://github.com/catchthatrabbit/ctr-web/pulls)
4. Wait for the PR to be merged
5. Use the new machine in the profitability calculator

## License

This project is licensed under the CORE License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Docusaurus](https://docusaurus.io/) - The web framework used
- [React](https://reactjs.org/) - The UI library
- [TypeScript](https://www.typescriptlang.org/) - The programming language
