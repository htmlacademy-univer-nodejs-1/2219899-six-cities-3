export const CreateOfferValidationMessage = {
  title: {
    required: 'title is required',
    minLength: 'minimum title length must be 10',
    maxLength: 'maximum title length must be 100',
  },
  description: {
    required: 'description is required',
    minLength: 'minimum description length must be 20',
    maxLength: 'maximum description length must be 1024',
  },
  city: {
    invalid: 'city must be Paris, Cologne, Brussels, Amsterdam, Hamburg or Dusseldorf ',
  },
  previewImage: {
    required: 'previewImage is required',
    maxLength: 'too short for field «image»',
  },
  images: {
    invalidFormat: 'field images must be an array',
    length: 'images must contain 6 items'
  },
  isPremium: {
    invalidFormat: 'field isPremium must be a boolean',
  },
  type: {
    invalid: 'type must be apartment, house, room or hotel',
  },
  bedrooms: {
    invalidFormat: 'bedrooms must be an integer',
    minValue: 'minimum bedrooms is 1',
    maxValue: 'maximum bedrooms is 8',
  },
  maxAdults: {
    invalidFormat: 'maxAdults must be an integer',
    minValue: 'minimum maxAdults is 1',
    maxValue: 'maximum maxAdults is 10',
  },
  price: {
    invalidFormat: 'price must be an integer',
    minValue: 'minimum price is 100',
    maxValue: 'maximum price is 100000',
  },
  goods: {
    invalidFormat: 'field goods must be an array',
    invalid: 'goods must be Breakfast, AirConditioning, LaptopFriendlyWorkspace, BabySeat, Washer, Towels, Fridge',
  },
  host: {
    invalidId: 'host field must be a valid id',
  },
  location: {
    invalidFormat: 'field categories must be an array',
    invalidFormatInt: 'location items must be an integer',
    length: 'location must contain 2 items',
  }
} as const;
