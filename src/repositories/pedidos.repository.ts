import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Pedidos, PedidosRelations, Persona, Productos} from '../models';
import {PersonaRepository} from './persona.repository';
import {ProductosRepository} from './productos.repository';

export class PedidosRepository extends DefaultCrudRepository<
  Pedidos,
  typeof Pedidos.prototype.id,
  PedidosRelations
> {

  public readonly Rpersona: BelongsToAccessor<Persona, typeof Pedidos.prototype.id>;

  public readonly Rproductos: HasOneRepositoryFactory<Productos, typeof Pedidos.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>, @repository.getter('ProductosRepository') protected productosRepositoryGetter: Getter<ProductosRepository>,
  ) {
    super(Pedidos, dataSource);
    this.Rproductos = this.createHasOneRepositoryFactoryFor('Rproductos', productosRepositoryGetter);
    this.registerInclusionResolver('Rproductos', this.Rproductos.inclusionResolver);
    this.Rpersona = this.createBelongsToAccessorFor('Rpersona', personaRepositoryGetter,);
    this.registerInclusionResolver('Rpersona', this.Rpersona.inclusionResolver);
  }
}
