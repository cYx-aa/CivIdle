import { isNaturalWonder, isSpecialBuilding } from "../../../shared/logic/BuildingLogic";
import { Config } from "../../../shared/logic/Config";
import { getGameState } from "../../../shared/logic/GameStateLogic";
import { getXyBuildings } from "../../../shared/logic/IntraTickCache";
import { type Tile } from "../../../shared/utilities/Helper";

export function onTileExplored(xy: Tile): void {
   const gs = getGameState();
   const building = gs.tiles.get(xy)?.building;
   if (isNaturalWonder(building?.type)) {
      switch (building?.type) {
         case "GrottaAzzurra": {
            getXyBuildings(gs).forEach((building) => {
               if (isSpecialBuilding(building.type)) {
                  return;
               }
               if (building.status === "completed" && Config.BuildingTier[building.type] === 1) {
                  building.level += 5;
               }
            });
            break;
         }
      }
   }
}
