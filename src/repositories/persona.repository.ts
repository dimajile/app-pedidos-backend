import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Persona, PersonaRelations, Pedidos} from '../models';
import {PedidosRepository} from './pedidos.repository';

export class PersonaRepository extends DefaultCrudRepository<
  Persona,
  typeof Persona.prototype.id,
  PersonaRelations
> {

  public readonly Rpedidos: HasManyRepositoryFactory<Pedidos, typeof Persona.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PedidosRepository') protected pedidosRepositoryGetter: Getter<PedidosRepository>,
  ) {
    super(Persona, dataSource);
    this.Rpedidos = this.createHasManyRepositoryFactoryFor('Rpedidos', pedidosRepositoryGetter,);
    this.registerInclusionResolver('Rpedidos', this.Rpedidos.inclusionResolver);
  }
}
