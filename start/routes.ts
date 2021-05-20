/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})
Route.group(() => {
  Route.post("register", "AuthController.register");
  Route.post("login", "AuthController.login");
  Route.group(() => {
  Route.get("stocks", "StocksController.index");
  Route.post("stocks", "StocksController.store");
  Route.post("stocks/:id", "StocksController.update");
  Route.delete("stocks/:id", "StocksController.destroy");
}).middleware("auth:api");
Route.group(() => {
    Route.get("items", "ItemsController.index");
    Route.post("items", "ItemsController.store");
    Route.post("items/:id", "ItemsController.update");
    Route.delete("items/:id", "ItemsController.destroy");
}).middleware("auth:api");
Route.group(() => {
  Route.get("outlets", "OutletsController.index");
  Route.post("outlets", "OutletsController.store");
  Route.post("outlets/:id", "OutletsController.update");
  Route.delete("outlets/:id", "OutletsController.destroy");
}).middleware("auth:api");
  Route.group(() => {
    Route.resource("posts", "PostsController").apiOnly();
    Route.resource("forums", "ForumsController").apiOnly();
    Route.resource("users", "ItemsController").apiOnly();
    Route.get("users/forums", "UsersController.forumsByUser");
    Route.get("users/posts", "UsersController.postsByUser");
  }).middleware("auth:api");
}).prefix("api");

