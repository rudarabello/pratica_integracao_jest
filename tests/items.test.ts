import supertest from "supertest";
import  app  from "../src/app";
import * as factory from "./factory/itemFactory";

let mainBody =  factory.customItem();

describe('Testa POST /items ', () => {
  it('Deve retornar 201, se cadastrado um item no formato correto', async ()=> {

    const response = await supertest(app).post("/items").send(mainBody);
    const status = response.status;
    expect(status).toEqual(201);
  });
  it('Deve retornar 409, ao tentar cadastrar um item que exista', async()=> {
    const response = await supertest(app).post("/items").send(mainBody);
    const status = response.status;
    expect(status).toEqual(409);
  });
});

describe('Testa GET /items ', () => {
  it('Deve retornar status 200 e o body no formato de Array', async()=> {
    const response = await supertest(app).get("/items");
    expect(response.body).toBeInstanceOf(Array);
    expect(response.status).toEqual(200);
  });
});

describe('Testa GET /items/:id ', () => {
  it('Deve retornar status 200 e um objeto igual a o item cadastrado', async()=> {
    const obj = {
      id: 1,
      title: "Guiana Dolphin",
      url: 'https://loremflickr.com/640/480/animals',
      description: "Nemo earum dolorem aut.\nAb blanditiis architecto sint omnis corporis rerum molestias.\nNumquam laudantium sed voluptatem quo est cum.",
      amount: 666
    }
    const response = await supertest(app).get("/items/1");
    expect(response.body).toEqual(expect.objectContaining(obj))
    expect(response.status).toEqual(200);
  });
  it('Deve retornar status 404 caso não exista um item com esse id', async()=> {
    const response = await supertest(app).get("/items/9999999");
    expect(response.status).toEqual(404);
  });
});