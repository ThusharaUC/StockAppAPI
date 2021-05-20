import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Item from "App/Models/Item";
export default class OutletsController {

    public async index({ request}: HttpContextContract)
        {
            const item = await Item.query();
            return item
        }
        public async show({ request, params}: HttpContextContract)
        {
            try {
                const item = await Item.find(params.id);
                return item
            
            } catch (error) {
                console.log(error)
            }

        }

        public async update({ auth, request, params}: HttpContextContract)
        {
            const item = await Item.find(params.id);
            if (item) {
                item.name = request.input('name');
                item.brand = request.input('brand');
                item.item_code = request.input('outlet_code');
                if (await item.save()) {
                    return item
                }
                return; // 422
            }
            return; // 401
        }

        public async store({ auth, request, response}: HttpContextContract)
        {
            const user = await auth.authenticate();
            const item = new Item();
            item.name = request.input('name');
                item.brand = request.input('brand');
                item.item_code = request.input('item_code');
                await item.save();
            return item
        }
        public async destroy({response, auth, request, params}: HttpContextContract)
        {
           const user = await auth.authenticate();
           const item = await Item.query().where('user_id', user.id).where('id', params.id).delete();
           return "success";
        }
}
