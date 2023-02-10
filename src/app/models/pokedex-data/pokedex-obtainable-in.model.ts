import { PokeGame, PokeObtainMethod } from 'src/app/enums';

export interface ObtainableIn {
  game: PokeGame;
  methods: PokeObtainMethod[];
}
