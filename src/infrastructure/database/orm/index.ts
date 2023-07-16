import { PostgressConfig } from '../postgres';
import { TypeOrmInstance } from './typeOrm';

export const Orm = new TypeOrmInstance(PostgressConfig);
