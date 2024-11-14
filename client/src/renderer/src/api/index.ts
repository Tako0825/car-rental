import auth from './modules/auth'
import car from './modules/car'
import carMaintenance from './modules/car-maintenance'
import feedback from './modules/feedback'
import payment from './modules/payment'
import rental from './modules/rental'
import upload from './modules/upload'
import user from './modules/user'

export const api = {
    auth,
    user,
    car,
    rental,
    upload,
    payment,
    feedback,
    carMaintenance
}
