export const UpdateOfferValidationMessage = {
  title: {
    required: 'title is required',
    length: 'Title length must be between 10 and 100',
  },
  description: {
    required: 'description is required',
    length: 'Description length must be between 20 and 1024',
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
    invalidFormat: 'field isFavourites must be a boolean',
  },
  isFavourites: {
    invalidFormat: 'field isFavourites must be a boolean',
  },
  rating: {
    invalidFormat: 'rating must be a number',
    minValue: 'minimum rating is 1',
    maxValue: 'maximum rating is 5',
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
    invalidFormat: 'Must be a location objects',
  }
} as const;
