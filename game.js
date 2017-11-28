enchant();
window.onload = function() {
	var game = new Game(640, 640);
	var firstScene = new Scene();
	var shopScene = new Scene();
	var battleScene = new Scene();
	var secondScene = new Scene();
	game.keybind(65, 'left');
	game.keybind(87, 'up');
	game.keybind(68, 'right');
	game.keybind(83, 'down');
	game.keybind(74, 'a');
	game.keybind(75, 'b');
	game.waitA = false;
	game.waitB = false;
	game.waitSelect = false;
	game.newGame = true;
	game.fps = 15;
	game.spriteWidth = 32;
	game.spriteHeight = 32;
	game.spriteSheetWidth = 384;
	game.spriteSheetHeight = 32;
	game.fgSpriteSheetWidth = 608;
	game.fgSpriteSheeHeight = 32;
	game.itemSpriteSheetWidth = 160;
	game.itemSpriteSheetHeight = 32;
	game.preload(["bgMap.png", "fgMap.png", "player.png", "itemsIcon.png", "welcomeBG.png", "battleBG.png"]);
	game.items = [
	{id: 0, description: "空灵挂件", effect: "+20伤害·不可叠加", price: 1200},
	{id: 1, description: "力量腰带", effect: "+10生命上限", price: 450},
	{id: 2, description: "魔礼之结", effect: "+50精气上限·+10速度·不可叠加", price: 5000},
	{id: 3, description: "微光披风", effect: "+50生命上限·+20精气上限·不可叠加", price: 2000},
	{id: 4, description: "月咏之瞳", effect: "+100精气上限·+30伤害", price: 8000}
	];
	var map = new Map(game.spriteWidth, game.spriteHeight);
	var foregroundMap = new Map(game.spriteWidth, game.spriteHeight);
	var setMaps = function(index) {
		var mData = [];
		var fmData = [];
		switch(index) {
			case 1: {
				mData = mapData;
				fmData = foregroundData;
				break;
			}
			case 2: {
				mData = map_2_Data;
				fmData = foreground_2_Data;
				break;
			}
		}
		map.image = game.assets['bgMap.png'];
		map.loadData(mData);
		foregroundMap.image = game.assets['fgMap.png'];
		foregroundMap.loadData(fmData);
		var collisionData = [];
		for(var i = 0; i < fmData.length; i++) {
			collisionData.push([]);
			for(var j = 0; j < fmData[i].length; j++) {
				var collision = 0;
				if(fmData[i][j] === 1 || fmData[i][j] === 3 || fmData[i][j] === 4 || fmData[i][j] === 7 || fmData[i][j] === 8 || fmData[i][j] === 9	
					|| fmData[i][j] === 10 || fmData[i][j] === 12 || fmData[i][j] === 13 || fmData[i][j] === 14 || fmData[i][j] === 15 || fmData[i][j] === 16 
					|| fmData[i][j] === 18) {
					collision = 1;
				}
				if(mData[i][j] >= 7 && mData[i][j] < 19 && mData[i][j] !== 17 || mData[i][j] === 5) {
					collision = 1;
				}
				if(fmData[i][j] === 0) {
					collision = 0;
				}
				collisionData[i][j] = collision;
			}
		}
		map.collisionData = collisionData;
	};
	var setStage = function() {
		var stage = new Group();
		stage.addChild(map);
		stage.addChild(foregroundMap);
		stage.addChild(player);
		stage.addChild(player.statLabel);
		firstScene.addChild(stage);
	};
	var setStage_2 = function() {
		var stage = new Group();
		stage.addChild(map_2);
		stage.addChild(foregroundMap_2);
		stage.addChild(player);
		stage.addChild(player.statLabel);
		secondScene.addChild(stage);
	};

	var player = new Sprite(game.spriteWidth, game.spriteHeight);
	var setPlayer = function() {
		player.name = "playerName";
		player.gold = 10000;
		player.exp = 0;
		player.expToNextLv = 100;
		player.expToNextLvMulti = 1.2;
		player.lv = 0;
		player.health = 200;
		player.modHealth = player.health;
		player.currentHealth = 200;
		player.healthRecover = 1;
		player.healthLvUp = 50;
		player.spirit = 50;
		player.modSpirit = player.spirit;
		player.currentSpirit = 50;
		player.spiritRecover = 1;
		player.spiritLvUp = 5;
		player.damage = 5;
		player.modDamage = player.damage;
		player.damageLvUp = 2;
		player.speed = 4;
		player.modSpeed = player.speed;
		player.speedLvUp = 0.1;
		//player.skillList = [
		//{id: 0, name: "斫金", dmg: 15 + player.modDamage, cost: 3 + player.lv, needLv: 1, action: function() {
		//			battle.wait = true;
		//			battle.skillDmg(0);
		//			battle.skillSelecting = false;
		//		}},
		//{id: 1, name: "断浪", dmg: 25 + player.modDamage, cost: 6 + player.lv, needLv: 5, action: function() {
		//			battle.wait = true;
		//			battle.skillDmg(1);
		//			battle.skillSelecting = false;
		//		}},
		//{id: 2, name: "分景", dmg: 50 + player.modDamage, cost: 15 + player.lv, needLv: 10, action: function() {
		//			battle.wait = true;
		//			battle.skillDmg(2);
		//			battle.skillSelecting = false;
		//		}},
		//{id: 3, name: "摄魂", dmg: 100 + player.modDamage, cost: 30 + player.lv, needLv: 20, action: function() {
		//			battle.wait = true;
		//			battle.skillDmg(3);
		//			battle.skillSelecting = false;
		//		}}];
		player.statLabel = new Label("");
		player.statLabel.width = game.width;
		player.statLabel.x = undefined;
		player.statLabel.y = undefined;
		player.statLabel.color = '#fff';
		player.dialogLabel = new Label("");
		player.dialogLabel.width = game.width;
		player.dialogLabel.x = undefined;
		player.dialogLabel.y = game.height * 5 / 6;
		player.dialogLabel.color = '#fff';
		player.dialogLabel.backgroundColor = '#000';
		player.inventoryLabel = new Label("行囊");
		player.inventoryLabel.x = game.width * 9 / 10;
		player.inventoryLabel.y = undefined;
		player.inventoryLabel.color = '#fff';
		player.spriteOffset = 0;
		player.startX = 3;
		player.startY = 4;
		player.x = player.startX * game.spriteWidth;
		player.y = player.startY * game.spriteHeight;
		player.dir = 0;
		player.walk = 0;
		player.walkSpeed = 4;
		player.frame = player.spriteOffset + player.dir * 3;
		player.image = new Surface(game.spriteSheetWidth, game.spriteSheetHeight);
		player.image.draw(game.assets['player.png']);
	};
	player.lvUp = function() {
		while(player.exp >= player.expToNextLv) {
			player.exp -= player.expToNextLv;
			player.lv++;
			player.expToNextLv *= player.expToNextLvMulti;
			player.health += player.healthLvUp;
			player.spirit += player.spiritLvUp;
			player.currentHealth = player.health;
			player.currentSpirit = player.spirit;
			player.damage += player.damageLvUp;
			player.speed += player.speedLvUp;
		}
		player.inventoryEffect();
	};
	player.attack = function(index) {
		if(index < 0) {
			return player.modDamage;
		}
		else {
			console.log(index);
			return player.skillList[index].dmg;
		}
	};
	player.displayStatLabel = function() {
		player.statLabel.text = 
		"人物：" + player.name + 
		"<br />生命：" +  player.currentHealth + "/" + player.modHealth + 
		//"<br />精气：" + player.currentSpirit + "/" + player.modSpirit + 
		"<br />等级：" + player.lv + "（" + Math.round(player.exp) + "经验）" + 
		"<br />伤害：" + player.modDamage +
		"<br />速度：" + Math.round(player.modSpeed) +
		"<br />金钱：" + player.gold;
	};
	player.hideStatLabel = function() {
		player.statLabel.text = "";
	};
	player.currentItem = [];
	player.itemSurface = new Surface(game.itemSpriteSheetWidth, game.itemSpriteSheetHeight);
	player.inventory = [];
	player.itemStack = {};
	player.stackNumLabel = [];
	player.inventoryEffect = function() {
		var deltaHealth = 0;
		var deltaSpirit = 0;
		var deltaDmg = 0;
		var deltaSpeed = 0;
		for(var i = 0; i < player.inventory.length; i++) {
			switch(player.inventory[i]) {
				case 0: {
					//deltaDmg = 20;
					break;
				}
				case 1: {
					deltaHealth += 10;
					break;
				}
				case 2: {
					//deltaSpirit += 50;
					//deltaSpeed += 10;
					break;
				}
				case 3: {
					//deltaHealth += 100;
					break;
				}
				case 4: {
					deltaSpirit += 100;
					deltaDmg += 30;
					break;
				}
			}
		}
		for(var itemIndex in player.itemStack) {
			//console.log(itemIndex);
			switch(parseInt(itemIndex)) {
				case 0: {
					//console.log(deltaDmg);
					deltaDmg += 20;
					break;
				}
				case 1: {
					//deltaDmg += 9;
					break;
				}
				case 2: {
					deltaSpirit += 50;
					deltaSpeed += 10;
					break;
				}
				case 3: {
					deltaHealth += 50;
					deltaSpirit += 20;
					break;
				}
				case 4: {
					break;
				}
			}
		}
		//console.log(deltaDmg);
		player.modHealth = player.health + deltaHealth;
		player.modSpirit = player.spirit + deltaSpirit;
		player.modDamage = player.damage + deltaDmg;
		player.modSpeed = player.speed + deltaSpeed;
	};
	player.stackInventory = function(itemIndex) {
		player.itemStack[itemIndex] = player.itemStack[itemIndex] ? player.itemStack[itemIndex] + 1 : 1;
		//console.log(player.itemStack);
	};
	player.showInventory = function(x) {
		if(player.currentItem.length === 0) {
			player.itemSurface.draw(game.assets['itemsIcon.png']);
			var i = 0;
			for(var itemIndex in player.itemStack) {
				var item = new Sprite(game.spriteWidth, game.spriteHeight);
				item.frame = itemIndex;
				item.x = x;
				item.y = game.height / 12 + game.height / 10 * i;
				item.image = player.itemSurface;
				i++;
				item.message = new Label(player.itemStack[itemIndex]);
				item.message.x = x + 20;
				item.message.y = item.y;
				item.message.color = '#fff';
				player.stackNumLabel.push(item.message);
				player.currentItem.push(item);
				firstScene.addChild(item);
				firstScene.addChild(item.message);
			}
			
		}
		player.inventoryLabel.text = "行囊";
		player.inventoryLabel.x = game.width * 9 / 10;
		firstScene.addChild(player.inventoryLabel);
	};
	player.hideInventory = function() {
		for(var i = 0; i < player.currentItem.length; i++) {
			player.currentItem[i].remove();
		}
		for(var i = 0; i < player.stackNumLabel.length; i++) {
			player.stackNumLabel[i].text = "";
		}
		player.currentItem = [];
		player.inventoryLabel.text = "";
	};
	player.hideWhenMoving = function() {
		player.hideStatLabel();
		player.hideInventory();
		player.clearDialog();
	};
	player.move = function() {
		this.frame = this.spriteOffset + this.dir * 3 + this.walk;
		if(this.isMoving) {
			this.moveBy(this.xMovement, this.yMovement);
			this.walk++;
			this.walk %= 3;
			//console.log(this.walk);
			if((this.xMovement && !(this.x % game.spriteWidth)) || (this.yMovement && !(this.y % game.spriteHeight))) {
				this.walk = 1;
				this.isMoving = false;
			}
		}
		else {
			this.xMovement = 0;
			this.yMovement = 0;
			if(game.input.up) {
				this.dir = 3;
				this.yMovement = -this.walkSpeed;
				player.hideWhenMoving();
			}
			else if(game.input.down) {
				this.dir = 0;
				this.yMovement = this.walkSpeed;
				player.hideWhenMoving();
			}
			else if(game.input.left) {
				this.dir = 1;
				this.xMovement = -this.walkSpeed;
				player.hideWhenMoving();
			}
			else if(game.input.right) {
				this.dir = 2;
				this.xMovement = this.walkSpeed;
				player.hideWhenMoving();
			}
			if(this.xMovement || this.yMovement) {
				var x = this.x + (this.xMovement ? this.xMovement / Math.abs(this.xMovement) * game.spriteWidth : 0);
				var y = this.y + (this.yMovement ? this.yMovement / Math.abs(this.yMovement) * game.spriteHeight : 0);
				if((x >= 0 && x < map.width) && (y >=0 && y < map.height) && !map.hitTest(x, y)) {
					this.isMoving = true;
					this.move();
				}
			}
		}
	};
	player.standPoint = function() {
		return {x: Math.floor(this.x / game.spriteWidth), y: Math.floor(this.y / game.spriteHeight)};
	};
	player.facingPoint = function() {
		var playerStandPoint = player.standPoint();
		var facingPoint;
		switch(player.dir) {
			case 3: {
				facingPoint = {x: playerStandPoint.x, y: playerStandPoint.y - 1};
				break;
			}
			case 0: {
				facingPoint = {x: playerStandPoint.x, y: playerStandPoint.y + 1};
				break;
			}
			case 1: {
				facingPoint = {x: playerStandPoint.x - 1, y: playerStandPoint.y};
				break;
			}
			case 2: {
				facingPoint = {x: playerStandPoint.x + 1, y: playerStandPoint.y};
				break;
			}
		}
		if((facingPoint.x < 0 || facingPoint.x >= map.width / 16) || (facingPoint.y < 0 || facingPoint.y >= map.height / 16)) {
			return null;
		}
		else {
			return facingPoint;
		}
	};
	player.facing = function() {
		var facingPoint = player.facingPoint();
		if(!facingPoint) {
			return null;
		}
		else {
			if(player.isMap_2)
				return foreground_2_Data[facingPoint.y][facingPoint.x];
			else 
				return foregroundData[facingPoint.y][facingPoint.x];
		}
	};
	player.clearDialog = function() {
		player.dialogLabel.text = "";
		player.dialogLabel.height = 0;
	};

	var npc = {
		say: function(message) {
			player.dialogLabel.height = game.height / 6;
			player.dialogLabel.text = message;
			firstScene.addChild(player.dialogLabel);
		}
	};

	var greeter = {
		name: "神秘的老爷爷：",
		newGameDialogStep: 0,
		action: function() {
			if(game.newGame) {
				switch(this.newGameDialogStep) {
					case 0: {
						npc.say(this.name + "<br />你好，欢迎来到新的世界");
						this.newGameDialogStep++;
						return;
					}
					case 1: {
						npc.say(player.name + "<br />这是哪里");
						this.newGameDialogStep++;
						return;
					}
					case 2: {
						npc.say(this.name + "<br />这是326世界");
						this.newGameDialogStep++;
						return;
					}
					case 3: {
						npc.say(player.name + "<br />326世界是啥");
						this.newGameDialogStep++;
						return;
					}
					case 4: {
						npc.say(this.name + "<br />你不要知道，但你的任务是拯救这个世界");
						this.newGameDialogStep++;
						return;
					}
					case 5: {
						npc.say(player.name + "<br />放我回去，我还要写软件工程的实验");
						this.newGameDialogStep++;
						return;
					}
					case 6: {
						npc.say(this.name + "<br />你可以去试着探索这个世界了");
						this.newGameDialogStep++;
						return;
					}
					case 7: {
						npc.say(player.name + "<br />好吧，我现在去四处转转");
						
						game.newGame = false;
						player.shopMission = true;
						return;
					}
				}
			}
			else {
				npc.say(this.name + "<br />加油，你是最胖的");
			}
			if(player.buyItemMission) {
				for(var item in player.itemStack) {
					if(parseInt(item) === 1) {
						npc.say(this.name + "<br />居然买到了吗……那你可以关掉这个游戏了。");
						//player.itemStack[item]--;
						player.exp += 100;
						player.gold += 100;
						//player.buyItemMission = false;
						player.truth = true;
						break;
					}
				}
			}
			if(player.truth && player.lv === 0) {
				npc.say(this.name + "<br />你可以试着转一转");
			}
		}
	};

	var shop = {
		name: "行商",
		shopMissionStep: 0,
		action: function() {
			if(game.newGame) {
				npc.say(this.name + "<br />你应该先去找一下老爷爷");
				return;
			}
			else if(player.shopMission) {
				switch(this.shopMissionStep) {
					case 0: {
						npc.say(this.name + "<br />你想要开启商店吗。");
						this.shopMissionStep++;
						break;
					}
					case 1: {
						npc.say(player.name + "<br />呃，或许是的");
						this.shopMissionStep++;
						break;
					}
					case 2: {
						npc.say(player.name + "<br />需要怎样开启呢");
						this.shopMissionStep++;
						break;
					}
					case 3: {
						npc.say(this.name + "<br />需要帮助我完成一个任务");
						this.shopMissionStep++;
						break;
					}
					case 4: {
						npc.say(player.name + "<br />……好吧。");
						this.shopMissionStep++;
						break;
					}
					case 5: {
						npc.say(this.name + "<br />那就先打败我旁边那个光头恶霸吧。");
						this.shopMissionStep++;
						break;
					}
					case 6: {
						npc.say(player.name + "<br />为什么？？他还说我帅来着。");
						this.shopMissionStep++;
						break;
					}
					case 7: {
						npc.say(this.name + "<br />然而他劫持了我，我卖不了道具，需要你的帮助。");
						this.shopMissionStep++;
						break;
					}
					case 8: {
						npc.say(player.name + "<br />……");
						player.firstBattle = true;
						//this.shopMissionStep++;
						break;
					}
				}
				return;
			}
			else if(this.missionComplete) {
				this.missionComplete = false;
				player.buyItemMission = true;
				npc.say(this.name + "<br />666");
				return;
			}
			//npc.say("行商" + "<br />啊，你找到我了！");
			game.pushScene(shopScene);
		}
	};
	var setShop = function() {
		var shop = new Group();
		shop.itemSelected = 0;
		shop.greeting = "您想要什么呢？";
		shop.refuse = "没钱还来买东西吗？？？";
		shop.appreciate = "您太识货了！";
		shop.byebye = "招待不周！";
		shop.message = new Label(shop.greeting);
		shop.shoppingMoney = function() {
			return "金钱：" + player.gold;
		};
		shop.drawKeeper = function() {
			var image = new Surface(game.fgSpriteSheetWidth, game.fgSpriteSheeHeight);
			var keeper = new Sprite(game.spriteWidth, game.spriteHeight);
			keeper.image = image;
			image.draw(game.assets["fgMap.png"]);
			keeper.frame = 18;
			keeper.x = game.spriteWidth;
			keeper.y = game.spriteHeight;
			keeper.scaleX = 2;
			keeper.scaleY = 2;
			this.addChild(keeper);
			this.message.x = game.spriteWidth * 3;
			this.message.y = game.spriteHeight;
			this.message.color = '#fff';
			this.addChild(this.message);
		};
		shop.drawGoods = function() {
			for(var i = 0; i < game.items.length; i++) {
				var image = new Surface(game.itemSpriteSheetWidth, game.itemSpriteSheetHeight);
				var item = new Sprite(game.spriteWidth, game.spriteHeight);
				image.draw(game.assets['itemsIcon.png']);
				item.frame = i;
				itemLocX = game.width / 10;
				itemLocY = game.height / 5 + game.height / 8 * i;
				item.x = itemLocX;
				item.y = itemLocY;
				item.image = image;
				this.addChild(item);
				var goodsDescription = new Label(game.items[i].description + "&nbsp;&nbsp;&nbsp;价格：" + game.items[i].price);
				goodsDescription.x = itemLocX + game.width / 8;
				goodsDescription.y = itemLocY;
				goodsDescription.color = '#fff';
				this.addChild(goodsDescription);
				if(i === this.itemSelected) {
					var image = new Surface(game.spriteSheetWidth, game.spriteSheetHeight);
					this.selector = new Sprite(game.spriteWidth, game.spriteHeight);
					image.draw(game.assets['player.png']);
					this.selector.frame = 4;
					this.selector.x = itemLocX + game.width * 5 / 8;
					this.selector.y = itemLocY;
					this.selector.image = image;
					this.addChild(this.selector);
				};
			};
		};
		shop.on('enter', function() {
			shoppingMoney.text = shop.shoppingMoney();
		});
		shop.on('enterframe',function() {
			setTimeout(function() {
				if(game.input.a && !game.waitA) {
					game.waitA = true;
					shop.buy();
					setTimeout(function() {
						game.waitA = false;
					}, 500);
				}
				else if(game.input.b && !game.waitB) {
					game.waitB = true;
					shop.message.text = shop.byebye;
					setTimeout(function() {
						game.popScene();
						game.waitB = false;
						shop.message.text = shop.greeting;
					}, 1000);
				}
				else if(game.input.up && !game.waitSelect) {
					game.waitSelect = true;
					shop.itemSelected = (shop.itemSelected + game.items.length - 1) % game.items.length;
					shop.selector.y = game.height / 5 + game.height / 8 * shop.itemSelected;
					shop.message.text = game.items[shop.itemSelected].effect;
					setTimeout(function() {
						game.waitSelect = false;	
					}, 500);
				}
				else if(game.input.down && !game.waitSelect) {
					game.waitSelect = true;
					shop.itemSelected = (shop.itemSelected + 1) % game.items.length;
					shop.selector.y = game.height / 5 + game.height / 8 * shop.itemSelected;
					shop.message.text = game.items[shop.itemSelected].effect;
					setTimeout(function() {
						game.waitSelect = false;
					}, 500);
				}
			}, 500);
			//player.showInventory(game.width * 10 / 11);
			shoppingMoney.text = shop.shoppingMoney();
		});
		shop.buy = function() {
			var itemPrice = game.items[shop.itemSelected].price;
			if(itemPrice > player.gold) {
				shop.message.text = shop.refuse;
			}
			else {
				player.gold -= itemPrice;
				player.inventory.push(game.items[shop.itemSelected].id);
				player.stackInventory(game.items[shop.itemSelected].id);
				player.inventoryEffect();
				shop.message.text = shop.appreciate;
			}
		};
		shop.drawKeeper();
		var shoppingMoney = new Label(shop.shoppingMoney());
		shoppingMoney.x = undefined;
		shoppingMoney.y = game.height * 5 / 6;
		shoppingMoney.color = '#fff';
		shop.addChild(shoppingMoney);
		shop.drawGoods();
		shopScene.backgroundColor = '#000';
		shopScene.addChild(shop);
	};


	var bandit = {
		name: "恶徒",
		health: 50,
		currentHealth: 50,
		spirit: 5,
		currentSpirit: 5,
		spriteFrame: 17,
		damage: 3,
		speed: 1,
		rewardExp: 10,
		rewardGold: 6,
		firstBattleStep: 0,
		action: function() {
			if(game.newGame) {
				npc.say(this.name + "<br />我想你应该回去先和老爷爷聊一聊");
				return;
			}
			else if(player.shopMission) {
				if(player.firstBattle) {
					switch(this.firstBattleStep) {
						case 0: {
							npc.say(this.name + "<br />找我来有什么事。");
							this.firstBattleStep++;
							return;
						}
						case 1: {
							npc.say(player.name + "<br />揍你啊");
							this.firstBattleStep++;
							return;
						}
						case 2: {
							npc.say(this.name + "<br />哇 社会真的是险恶");
							this.firstBattleStep++;
							return;
						}
						case 3: {
							npc.say(player.name + "<br />劫持别人的明明是你好不好");
							this.firstBattleStep++;
							return;
						}
						case 4: {
							npc.say(this.name + "<br />也是，但我是不可战胜的！");
							this.firstBattleStep++;
							return;
						}
						case 5: {
							npc.say(player.name + "<br />……出招吧……");
							this.firstBattleStep++;
							return;
						}
						case 6: {
							player.clearDialog();
							break;
						}
					}
				}
				else {
					npc.say(this.name + "<br />哇 你真的是很帅。");
					return;
				}
			}
			if(this.currentHealth <= 0) {
				npc.say(this.name + "<br />好吧好吧，我放了他！");
				player.shopMission = false;
				player.firstBattle = false;
				shop.missionComplete = true;
			}
			else {
				player.currentEnemy = this;
				game.pushScene(battleScene);
			}
		}
	};
	var spriteRoles = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, greeter, bandit, bandit, shop];

	var setBattle = function() {
		battleScene.backgroundColor = '#000';
		var battle = new Group();
		battle.menu = new Label();
		battle.menu.x = game.width / 2 - 50;
		battle.menu.y = game.height / 3;
		battle.menu.color = '#000';
		battle.activeAction = 0;
		battle.skillSelecting = false; 
		battle.bgImg = new Sprite(game.width, game.height);
		battle.bgImg.image = new Surface(game.width, game.height);
		battle.bgImg.image.draw(game.assets['battleBG.png']);

		battle.addChild(battle.bgImg);

		battle.getPlayerStatus = function() {
			return 	"生命：" +  player.currentHealth + "/" + player.modHealth + 
		"<br />精气：" + player.currentSpirit + "/" + player.modSpirit +
		"<br />速度：" + player.modSpeed + 
		"<br />伤害：" + player.modDamage; 
		};
		battle.playerStatus = new Label(battle.getPlayerStatus());
		battle.playerStatus.color = '#000';
		battle.playerStatus.x = game.width * 2 / 3;
		battle.playerStatus.y = game.height * 2 / 3;

		battle.getEnemyStatus = function() {
			return 	"生命：" +  player.currentEnemy.currentHealth + "/" + player.currentEnemy.health + 
		"<br />速度：" + player.currentEnemy.speed + "<br />伤害：" + player.currentEnemy.damage; 
		};

		battle.atkFluctuation = function(atk) {
			return Math.round((Math.random() + 0.5) * atk);
		};

		battle.win = function() {
			battle.over = true;
			player.exp += player.currentEnemy.rewardExp;
			player.gold += player.currentEnemy.rewardGold;
			battle.menu.text = "获胜！" + "<br />战利品：" + player.currentEnemy.rewardExp + "经验" +
			"&nbsp;&nbsp;&nbsp;&nbsp;" + player.currentEnemy.rewardGold + "金钱";
			//player.statLabel.x = game.width / 3;
			//player.statLabel.y = game.height / 3;
			player.lvUp();
		};

		battle.lose = function() {
			battle.over = true;
			player.exp = Math.round(player.exp / 2);
			player.gold = Math.round(player.gold / 2);
			player.currentHealth = 1;
			player.currentSpirit = 0;
			battle.menu.text = "战败！<br />损失了一半的经验与金钱！";
			//player.statLabel.x = game.width / 3;
			//player.statLabel.y = game.height / 3;
		};

		battle.playerDamage = function(atkIndex) {
			var currentEnemy = player.currentEnemy;
			var playerAtk = battle.atkFluctuation(player.attack(atkIndex));
			var actionLabel = "";
			if(atkIndex < 0) {
				actionLabel = "普通攻击";
			}
			else {
				actionLabel = player.skillList[atkIndex].name;
				player.currentSpirit -= player.skillList[atkIndex].cost;
			}
			currentEnemy.currentHealth -= playerAtk;
			battle.menu.text = "你使用" + actionLabel + "对敌方造成了" + playerAtk + "点伤害";
			if(currentEnemy.currentHealth <= 0) {
				setTimeout(function() {
					battle.win();
				}, 500);
			}
		};

		battle.enemyDamage = function() {
			var currentEnemy = player.currentEnemy;
			var enemyAtk = battle.atkFluctuation(currentEnemy.damage);
			player.currentHealth -= enemyAtk;
			battle.menu.text = "你受到了" + enemyAtk + "点伤害";
			if(player.currentHealth <= 0) {
				setTimeout(function() {
					battle.lose();
				}, 500);
			}
		};

		battle.actions = [
		{name: "攻击", action: function() {
			battle.wait = true;
			battle.skillDmg(-1);
		}}, 
		//{name: "技能", action: function() {
		//	battle.wait = true;
		//	setTimeout(function() {
		//		battle.activeAction = 0;
		//		battle.menu.text = battle.skillActionsList();
		//		battle.wait = false;
		//		battle.skillSelecting = true;
		//	}, 500);
		//}},
		{name: "逃跑", action: function() {
			if(player.modSpeed >= player.currentEnemy.speed) {
				game.pause();
				battle.menu.text = "你逃走了！";
				setTimeout(function() {
					battle.menu.text = "";
					game.popScene();
				}, 500);
			}
			else {
				battle.menu.text = "逃跑失败！";
				battle.wait = true;
				battle.activeAction = 0;
				setTimeout(function() {
					battle.menu.text = battle.actionsList();
					battle.wait = false;
				}, 500);
			}
		}}];

		battle.actionsList = function() {
			battle.optionText = [];
			for(var i = 0; i < battle.actions.length; i++) {
				if(i === battle.activeAction) {
					battle.optionText[i] = "<span class='active-option'>" + battle.actions[i].name + "</span>";
				}
				else {
					battle.optionText[i] = battle.actions[i].name;
				}
			}
			return battle.optionText.join("<br />");
		};

		battle.optionSkillText = [];
		battle.skillActionsList = function() {
			for(var i = 0; i < player.skillList.length; i++) {
				if(player.lv >= player.skillList[i].needLv) {
					if(i === battle.activeAction) {
						battle.optionSkillText[i] = "<span class='active-option'>" + player.skillList[i].name + "</span>";
					}
					else {
						battle.optionSkillText[i] = player.skillList[i].name;
					}
				}
			}
			return battle.optionSkillText.join("<br />");
		};

		battle.skillDmg = function(index) {
			if(player.modSpeed >= player.currentEnemy.speed) {
				battle.playerDamage(index);
				setTimeout(function() {
					if(!battle.over) {
						battle.enemyDamage();
					}
					if(!battle.over) {
						setTimeout(function() {
							player.currentHealth += player.healthRecover;
							player.currentSpirit += player.spiritRecover;
							battle.menu.text = battle.actionsList();
							battle.wait = false;
						}, 500);
					}
					else {
						setTimeout(function() {
							battle.menu.text = "";
							game.popScene();
						}, 1000);
					}
				}, 500);
			}
			else {
				battle.enemyDamage();
				setTimeout(function() {
					if(!battle.over) {
						battle.playerDamage(index);
					}
					if(!battle.over) {
						setTimeout(function() {
							player.currentHealth += player.healthRecover;
							player.currentSpirit += player.spiritRecover;
							battle.menu.text = battle.actionsList();
							battle.wait = false;
						}, 500);
					}
					else {
						setTimeout(function() {
							battle.menu.text = "";
							game.popScene();
						}, 1000);
					}
				}, 500);
			}	
		};

		//player.skillList = [
		//{id: 0, name: "斫金", dmg: 15 + player.modDamage, cost: 3 + player.lv, needLv: 1, action: function() {
		//			battle.wait = true;
		//			battle.skillDmg(0);
		//			battle.skillSelecting = false;
		//		}},
		//{id: 1, name: "断浪", dmg: 25 + player.modDamage, cost: 6 + player.lv, needLv: 5, action: function() {
		//			battle.wait = true;
		//			battle.skillDmg(1);
		//			battle.skillSelecting = false;
		//		}},
		//{id: 2, name: "分景", dmg: 50 + player.modDamage, cost: 15 + player.lv, needLv: 10, action: function() {
		//			battle.wait = true;
		//			battle.skillDmg(2);
		//			battle.skillSelecting = false;
		//		}},
		//{id: 3, name: "摄魂", dmg: 100 + player.modDamage, cost: 30 + player.lv, needLv: 20, action: function() {
		//			battle.wait = true;
		//			battle.skillDmg(3);
		//			battle.skillSelecting = false;
		//		}}];

		battle.battleSprites = function() {
			var image = new Surface(game.spriteSheetWidth, game.spriteSheetHeight);
			image.draw(game.assets['player.png']);
			battle.player = new Sprite(game.spriteWidth, game.spriteHeight);
			battle.player.image = image;
			battle.player.frame = 4;
			battle.player.x = game.width * 2 / 3 - 50;
			battle.player.y = game.height / 2;

			var image_2 = new Surface(game.fgSpriteSheetWidth, game.fgSpriteSheeHeight);
			image_2.draw(game.assets['fgMap.png']);
			battle.enemy = new Sprite(game.spriteWidth, game.spriteHeight);
			battle.enemy.image = image_2;
			battle.enemy.x = game.width / 3 - 50;
			battle.enemy.y = game.height / 2;
			battle.addChild(battle.enemy);
		};
		battle.battleSprites();

		battleScene.on('enter', function() {
			battle.over = false;
			battle.wait = true;
			battle.menu.text = "";

			battle.enemy.frame = player.currentEnemy.spriteFrame;
			battle.enemyStatus = new Label(battle.getEnemyStatus());
			battle.enemyStatus.color = '#000';
			battle.enemyStatus.x = game.width / 7;
			battle.enemyStatus.y = game.height / 7;
			battle.addChild(battle.enemyStatus);

			setTimeout(function() {
				battle.menu.text = battle.actionsList();
				battle.wait = false;
			}, 500);
		});

		battleScene.on('enterframe', function() {
			if(!battle.wait) {
				if(!battle.skillSelecting) {
					if(game.input.a && !game.waitA) {
						game.waitA = true;
						battle.actions[battle.activeAction].action();
						setTimeout(function() {
							game.waitA = false;
						}, 500);
					}
					else if(game.input.down && !game.waitSelect) {
						game.waitSelect = true;
						battle.activeAction = (battle.activeAction + 1) % battle.actions.length;
						battle.menu.text = battle.actionsList();
						setTimeout(function() {
							game.waitSelect = false;
						}, 100);
					}
					else if(game.input.up && !game.waitSelect) {
						game.waitSelect = true;
						battle.activeAction = (battle.activeAction - 1 + battle.actions.length) % battle.actions.length;
						battle.menu.text = battle.actionsList();
						setTimeout(function() {
							game.waitSelect = false;
						}, 100);
					}
				}
				else {
					if(game.input.a && !game.waitA && battle.optionSkillText.length !== 0) {
						game.waitA = true;
						//console.log(battle.skillActions[battle.activeAction]);
						//battle.skillActions[battle.activeAction].action();
						if(player.currentSpirit < player.skillList[battle.activeAction].cost) {
							battle.wait = true;
							battle.menu.text = "精气不足！"
							setTimeout(function() {
								game.waitA = false;
								battle.wait = false;
								battle.menu.text = battle.skillActionsList();
							}, 500);
						}
						else {
							player.skillList[battle.activeAction].action();
							setTimeout(function() {
								game.waitA = false;
							}, 500);
						}
					}
					else if(game.input.b && !game.waitB) {
						game.waitB = true;
						setTimeout(function() {
							battle.activeAction = 0;
							battle.menu.text = battle.actionsList();
							battle.skillSelecting = false;
							game.waitB = false;
						}, 500);
					}
					else if(game.input.down && !game.waitSelect && battle.optionSkillText.length !== 0) {
						game.waitSelect = true;
						battle.activeAction = (battle.activeAction + 1) % battle.optionSkillText.length;
						battle.menu.text = battle.skillActionsList();
						setTimeout(function() {
							game.waitSelect = false;
						}, 100);
					}
					else if(game.input.up && !game.waitSelect && battle.optionSkillText.length !== 0) {
						game.waitSelect = true;
						battle.activeAction = (battle.activeAction - 1 + battle.optionSkillText.length) % battle.optionSkillText.length;
						battle.menu.text = battle.skillActionsList();
						setTimeout(function() {
							game.waitSelect = false;
						}, 100);
					}
				}
				battle.playerStatus.text = battle.getPlayerStatus();
				battle.enemyStatus.text = battle.getEnemyStatus();
			}
		});

		battleScene.on('exit', function() {
			setTimeout(function() {
				battle.menu.text = "";
				battle.activeAction = 0;
				battle.playerStatus.text = battle.getPlayerStatus();
				battle.enemyStatus.text = battle.getEnemyStatus();
				game.resume();
			}, 1000);
		});

		battle.addChild(battle.playerStatus);
		battle.addChild(battle.menu);
		battle.addChild(battle.player);
		battleScene.addChild(battle);
	};

	var setWelcome = function() {
		game.rootScene.backgroundColor = '#000';
		game.rootScene.message = new Label(" ");
		game.rootScene.message.color = '#000';
		game.rootScene.message.x = 10;
		game.rootScene.message.y = game.height / 3;
		game.rootScene.menu = new Label();
		game.rootScene.menu.color = '#000';
		game.rootScene.menu.x = game.width / 2 - 30;
		game.rootScene.menu.y = game.height * 2 / 3;
		game.rootScene.activeAction = 0;
		game.rootScene.bgImg = new Sprite(game.width, game.height);
		game.rootScene.bgImg.image = new Surface(game.width, game.height);
		game.rootScene.bgImg.image.draw(game.assets['welcomeBG.png']);

		game.rootScene.actions = [
		{name: "新的故事", action: function() {
			player.name = prompt("伟大的冒险家，你叫什么名字？", "");
			game.pushScene(firstScene);
		}},
		//{name: "旧的篇章", action: function() {
		//	game.rootScene.menu.text = "本机没有任何存档！<br />由于你尝试读取存档，你获得1000经验";
		//	player.exp += 1000;
		//	player.lvUp();
		//	setTimeout(function() {
		//		game.rootScene.menu.text = game.rootScene.actionsList();
		//	}, 1000);
		//}},
		{name: "游戏帮助", action: function() {
			game.rootScene.message.text = "使用方向键或WASD移动和选择，使用J键交互，使用K键取消和返回。<br />移动即可中断对话和隐藏状态栏；若有正在进行的对话，下次交互时从中断处继续。<br />由于你观看了游戏帮助，你获得500经验。";
			player.exp += 500;
			player.lvUp();
		}}];

		game.rootScene.actionsList = function() {
			game.rootScene.optionText = [];
			for(var i = 0; i < game.rootScene.actions.length; i++) {
				if(i === game.rootScene.activeAction) {
					game.rootScene.optionText[i] = "<span class='active-option'>" + game.rootScene.actions[i].name + "</span>";
				}
				else {
					game.rootScene.optionText[i] = game.rootScene.actions[i].name;
				}
			}
			return game.rootScene.optionText.join("<br />");
		};
		game.rootScene.menu.text = game.rootScene.actionsList();

		game.rootScene.on('enter', function() {
			game.rootScene.menu.text = game.rootScene.actionsList();
		});

		game.rootScene.on('enterframe', function() {
			if(game.input.a && !game.waitA) {
				game.waitA = true;
				game.rootScene.actions[game.rootScene.activeAction].action();
				setTimeout(function() {
					game.waitA = false;
				}, 500);
			}
			else if(game.input.down && !game.waitSelect) {
				game.waitSelect = true;
				game.rootScene.activeAction = (game.rootScene.activeAction + 1) % game.rootScene.actions.length;
				game.rootScene.menu.text = game.rootScene.actionsList();
				setTimeout(function() {
					game.waitSelect = false;
				}, 100);
			}
			else if(game.input.up && !game.waitSelect) {
				game.waitSelect = true;
				game.rootScene.activeAction = (game.rootScene.activeAction - 1 + game.rootScene.actions.length) % game.rootScene.actions.length;
				game.rootScene.menu.text = game.rootScene.actionsList();
				setTimeout(function() {
					game.waitSelect = false;
				}, 100);
			}
		});

		game.rootScene.addChild(game.rootScene.bgImg);
		game.rootScene.addChild(game.rootScene.message);
		game.rootScene.addChild(game.rootScene.menu);
	};

	game.focusOnPlayer = function() {
		var x = Math.min(game.width / 2 - game.spriteWidth / 2 - player.x, 0);
		var y = Math.min(game.height / 2 - game.spriteHeight / 2 - player.y, 0);
		x = Math.max(x + map.width, game.width) - map.width;
		y = Math.max(y + map.height, game.height) - map.height;
		firstScene.firstChild.x = x;
		firstScene.firstChild.y = y;
	};

	game.focusOnPlayer_2 = function() {
		var x = Math.min(game.width / 2 - game.spriteWidth / 2 - player.x, 0);
		var y = Math.min(game.height / 2 - game.spriteHeight / 2 - player.y, 0);
		x = Math.max(x + map_2.width, game.width) - map_2.width;
		y = Math.max(y + map_2.height, game.height) - map_2.height;
		secondScene.firstChild.x = x;
		secondScene.firstChild.y = y;
	};

	game.onload = function() {
		setWelcome();
		setMaps(1);
		setPlayer();
		setStage();
		setShop();
		setBattle();

		firstScene.on('enter', function() {
			if(game.newGame)
				npc.say("神秘的声音" + "<br />勇敢的冒险家啊，东南方向高台上的那位老爷爷正在呼唤你。");
		});

		player.on('enterframe', function() {
			if(!game.input.up && !game.input.down && !game.input.left && !game.input.right) {
				player.displayStatLabel();
				player.showInventory(game.width * 10 / 11);
			};

			player.move();

			if(game.input.a && !game.waitA) {
				game.waitA = true;
				var playerFacing = player.facing();
				if(playerFacing && spriteRoles[playerFacing]) {
					spriteRoles[playerFacing].action();
				};
				setTimeout(function() {
					game.waitA = false;
				}, 100);
			};

		});
		firstScene.on('enterframe', function(e) {
			game.focusOnPlayer();
			if(player.standPoint().x === 12 && player.standPoint().y === 0) {
				player.x = 12 * game.spriteWidth;
				player.y = 18 * game.spriteHeight;
				setMaps(2);
				player.isMap_2 = true;
			}
			if(player.isMap_2 && player.standPoint().x === 12 && player.standPoint().y === 19) {
				player.y = 1 * game.spriteHeight;
				setMaps(1);
				player.isMap_2 = false;
			}
		});

	};
	game.start();
};