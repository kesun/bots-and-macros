# bots-and-macros
An on-going compilation of JS bots for web-based applications/games. Saves me and my fellow comrades from the need to perform dry and repetitive tasks on the browser while achieving the same goal with insane efficiency.

## Target apps/platforms
* Grand Sphere [ACTIVE, see notes]
  * A lazy but practical MonkeyRunner script for farming
* Ayakashi Ghost Guild (Chrome ext. version) [CONTENT OBSOLETE]
  * Bots for various event, battle, and story modes.
* Steam community market. ([Dummy-proof generator version](http://konishi.graphics/test/)) [OUT OF DATE]
  * Bot for camping an item for a particular price and auto-purchase (bulk purchase option available)

## NOTE:
### Grand Sphere raiding bot
The bot is a behavioural automation that's custom tailored to my phone's resolution (1080x1920) and my personal team/unit lineups (I'll explain how it works for my particular setup below). It's made by taking the advantage of MonkeyRunner, which is part of the (supposed) testing suite that comes with Android Studio. MonkeyRunner simulate interactions within the physical premise of the Android phone without knowing any details about the current status of the system. The pro of this is that it's non-intrusive, so it's the closest that one can get to bot and mimick interactions without tempering the apps or system (less chance of being caught botting, even lesser if the action coordinates and intervals are slightly randomized). The con, of course, would be that it's bloody stupid, which means that the person crafting the automation (such as me) needs to have a full understanding of the behavioural needs of the target application in order to implement something that actually works, with the only conditional trigger cues being very specific screen pixel information.

First of all, since the trigger cues are based on precise pixel colour information, having the exact same phone resolution as I do is the most critical part if you just want to be able to plug and play this script. Secondly, there are very specific setup to my battle lineups: for discovery, I'm using a team that's guaranteed to wipe out each of the three waves in one go without using spheres, because the script assumes that the discovery will terminate after 3 rounds of battles; for raid boss, I'm using Stella (fully broken) + Stella (not broken) + Elena + Anne. Before the battle starts, the script swipes the Elena to the first position, changing the lineup to Elena + Stella (not broken) + Stella (fully broken) + Anne. Why? Because on step 4 or 5 (depending on which boss I'm up against), there'll be an action that activates all skills of the units. Under lucky circumstances where non of the units are paralyzed (blind is alright since skills still deal half the damage), Elena needs to activate her skill first to boost party attack, then the weaker Stella will use hers to deal decent dps and reduced boss' def, then the fully broken Stella will deal heavier (assuming not blinded) damage and stack another def down, and lastly Anne will deal some fair damage with all the previous boosts stacked together.

This script will work out of the box if you can have a similar boss setup that involves two core dps and two gauge boosters, and event discovery team that's guaranteed to wipe out the boss wave within one round.

#### Special notes:
The current scripts is tailored for the current event, has bp auto refill activated (since I have more than enough of them to burn), wait for regen and assist open/direct requests instead if the AP is less than 5 (not using gem to refill), using 0 bp poke for own boss, and using 0/1 bp on the first light/uber boss that's in the list, and attempts to discover my own boss only if there's no active direct assist requests from allies. So the purpose of the script is purely for farming materials.
