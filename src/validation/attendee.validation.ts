import * as Joi from 'joi'

export function validateAttendee(attendee){
    const Schema = Joi.object().keys({
        email: Joi.string().email().label("Email").max(50).required(),
        firstName: Joi.string().label("First Name").required(),
        lastName: Joi.string().label("Last Name").required(),
        phone: Joi.string().label("Phone Number")
    })

    return Schema.validate(attendee)
}