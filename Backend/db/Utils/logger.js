const winston = require('winston');

// Define the log configuration
const logger = winston.createLogger({
    level: 'info', // Default log level
    format: winston.format.combine(
        winston.format.timestamp(), // Add timestamps
        winston.format.printf(({ level, message, timestamp }) => {
            return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
        })
    ),
    transports: [
        // Log errors to a file
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        
        // Log all messages to a file
        new winston.transports.File({ filename: 'logs/combined.log' }),
        
        // Log to the console for development
        new winston.transports.Console({ format: winston.format.simple() }),
    ],
});

// If the environment is development, log more details
if (process.env.NODE_ENV === 'development') {
    logger.add(
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            ),
        })
    );
}

module.exports = logger;
n