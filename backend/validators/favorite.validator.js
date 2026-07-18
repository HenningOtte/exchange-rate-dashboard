const { body, validationResult, param } = require("express-validator");

const createFavoriteValidation = [
  param("id").isMongoId().withMessage("Invalid favorite id"),
  body("name").notEmpty().withMessage("Name is required"),
  body("creationDate").notEmpty().withMessage("Date is required"),
  body("state.converter.initialValue")
    .notEmpty()
    .withMessage("Initial-Value is required"),
  body("state.converter.targetValue")
    .notEmpty()
    .withMessage("Target-Value is required"),
  body("state.converter.sourceCurrency")
    .isIn(["USD", "EUR", "GBP"])
    .withMessage("Invalid source currency"),
  body("state.converter.targetCurrency")
    .isIn(["USD", "EUR", "GBP"])
    .withMessage("Invalid target currency"),
  body("state.converter.historicalDate")
    .notEmpty()
    .withMessage("isHistorical must be a boolean"),
  body("state.converter.isHistorical").notEmpty().withMessage("Is Historical"),
  body("state.dashboard.dateFrom")
    .notEmpty()
    .withMessage("DateFrom is required"),
  body("state.dashboard.dateTo").notEmpty().withMessage("DateTo is required"),
];

const updateFavoriteValidation = [
  body("name").optional().notEmpty().withMessage("Name is required"),
  body("creationDate").optional().notEmpty().withMessage("Date is required"),
  body("state.converter.initialValue")
    .optional()
    .notEmpty()
    .withMessage("Initial-Value is required"),
  body("state.converter.targetValue")
    .optional()
    .notEmpty()
    .withMessage("Target-Value is required"),
  body("state.converter.sourceCurrency")
    .optional()
    .isIn(["USD", "EUR", "GBP"])
    .withMessage("Invalid source currency"),
  body("state.converter.targetCurrency")
    .optional()
    .isIn(["USD", "EUR", "GBP"])
    .withMessage("Invalid target currency"),
  body("state.converter.historicalDate")
    .optional()
    .notEmpty()
    .withMessage("isHistorical must be a boolean"),
  body("state.converter.isHistorical")
    .optional()
    .notEmpty()
    .withMessage("Is Historical"),
  body("state.dashboard.dateFrom")
    .optional()
    .notEmpty()
    .withMessage("DateFrom is required"),
  body("state.dashboard.dateTo")
    .optional()
    .notEmpty()
    .withMessage("DateTo is required"),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  createFavoriteValidation,
  updateFavoriteValidation,
  handleValidationErrors,
};
