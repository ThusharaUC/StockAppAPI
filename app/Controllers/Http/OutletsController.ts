import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Outlet from "App/Models/Outlet";
export default class OutletsController {

    public async index({ request}: HttpContextContract)
        {
            const outlet = await Outlet.query();
            return outlet
        }
        public async show({ request, params}: HttpContextContract)
        {
            try {
                const outlet = await Outlet.find(params.id);
                return outlet
            
            } catch (error) {
                console.log(error)
            }

        }

        public async update({ auth, request, params}: HttpContextContract)
        {
            const outlet = await Outlet.find(params.id);
            if (outlet) {
                outlet.name = request.input('name');
                outlet.location = request.input('location');
                outlet.outlet_code = request.input('outlet_code');
                if (await outlet.save()) {
                    return outlet
                }
                return; // 422
            }
            return; // 401
        }

        public async store({ auth, request, response}: HttpContextContract)
        {
            const user = await auth.authenticate();
            const outlet = new Outlet();
            outlet.name = request.input('name');
                outlet.location = request.input('location');
                outlet.outlet_code = request.input('outlet_code');
                await outlet.save();
            return outlet
        }
        public async destroy({response, auth, request, params}: HttpContextContract)
        {
           const user = await auth.authenticate();
           const post = await Outlet.query().where('user_id', user.id).where('id', params.id).delete();
           return response.redirect('/dashboard');
        }
}
