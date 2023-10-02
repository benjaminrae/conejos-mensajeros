export interface WriteRepository<Entity> {
  create(entity: Entity): Promise<Entity>;
  update(entity: Entity): Promise<Entity>;
  delete(entity: Entity): Promise<Entity>;
}
