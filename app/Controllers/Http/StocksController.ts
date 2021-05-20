import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Stock from "App/Models/Stock";
export default class OutletsController {

    public async index({}: HttpContextContract)
        {
            const stock = await Stock.query().preload('user').preload('item').preload('outlet');
            return stock
        }
        public async show({ params}: HttpContextContract)
        {
            try {
                const stock = await Stock.find(params.id);
                if(stock){
                    await stock.preload('user')
                }
                if (stock?.itemId){
                    await stock.preload('item')
                }
                return stock
            
            } catch (error) {
                console.log(error)
            }

        }

        public async update({  request, params}: HttpContextContract)
        {
            const stock = await Stock.find(params.id);
            if (stock) {
                stock.name = request.input('name');
                stock.avalStock = request.input('avalStock');
                stock.sysStock = request.input('sysStock');
                // stock.itemId = request.input('item_id');
                if (await stock.save()) {
                    await stock.refresh();
                await stock.preload('user');
                await stock.preload('item');
                await stock.preload('outlet');
                return stock
                }
                return; // 422
            }
            return; // 401
        }

        public async store({ auth, request}: HttpContextContract)
        {
            const user = await auth.authenticate();
            const stock = new Stock();
            stock.name = request.input('name');
            stock.avalStock = request.input('avalStock');
            stock.sysStock = request.input('sysStock');
            stock.item_id = request.input('itemId');
            stock.outlet_id = request.input('outletId');
            console.log(stock);
            await user.related('stocks').save(stock)
            // await user.related('stocks').save(stock)
            if (await stock.save()) {
                await stock.refresh();
                await stock.preload('user');
                await stock.preload('item');
                await stock.preload('outlet');
                return stock
            }
        }
        public async destroy({ auth, params}: HttpContextContract)
        {
           const user = await auth.authenticate();
           const stock = await Stock.query().where('user_id', user.id).where('id', params.id).delete();
           console.log(stock);
           return "success";
        }
}
