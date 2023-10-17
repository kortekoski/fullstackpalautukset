const mongoose = require('mongoose')

mongoose.set('strictQuery', false)


const url = process.env.MONGODB_URI


console.log('connecting to', url)
mongoose.connect(url)

  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const numberValidator = (number) => {
  if(!(number.includes('-'))){
    console.log('1')
    return false
  }

  const numberparts = number.split('-')

  if (numberparts.length !== 2) {
    console.log('2')
    return false
  }

  if(numberparts[0].length < 2 || numberparts[0].length > 3){
    console.log('3')
    return false
  }

  if(numberparts[1].length < 6 || numberparts[1].length > 12) {
    console.log('4')
    return false
  }

  return true
}

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number: {
    type: String,
    minlength: 8,
    validate: {
      validator: numberValidator,
      message: 'Number validation failed'
    }
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Person', personSchema)