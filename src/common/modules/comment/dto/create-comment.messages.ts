export const CreateCommentMessages = {
  comment: {
    invalidFormat: 'Comment is required',
    lengthField: 'Min length is 5, Max is 1024'
  },
  rating: {
    invalidFormat: 'Rating must be a number',
    minValue: 'Minimum rating is 1',
    maxValue: 'Maximum rating is 5',
  },
  offerId: {
    invalidFormat: 'OfferId field must be a valid id'
  },
  userId: {
    invalidFormat: 'UserId field must be a valid id'
  },
} as const;
