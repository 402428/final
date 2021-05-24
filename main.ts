enum ActionKind {
    Walking,
    Idle,
    Jumping,
    Attacking,
    WalkingLeft,
    WalkingRight,
    JumpingLeft,
    JumpingRight,
    IdleLeft,
    IdleRight,
    AttackingLeft,
    AttackingRight,
    S1,
    S2,
    S3,
    S4
}
namespace SpriteKind {
    export const EnemyT1 = SpriteKind.create()
    export const EnemyT2 = SpriteKind.create()
    export const EnemyT3 = SpriteKind.create()
    export const iconBar = SpriteKind.create()
    export const Crystal = SpriteKind.create()
}
function loopHeroMovement () {
    Icon.setPosition(Hero.x - 200, Hero.y - 200)
    if (powers[1] == 1) {
        if (Hero.tileKindAt(TileDirection.Bottom, sprites.dungeon.hazardWater)) {
            Hero.ay = 0
            Hero.vy = 0
        } else {
            Hero.ay = 300
        }
    } else {
        Hero.ay = 300
    }
    if (powers[2] == 1) {
        if (Hero.vy == 0) {
            canDoubleJump = 1
        }
    }
    if (Hero.vx < 0) {
        HeroFacing = -1
    } else if (Hero.vx > 0) {
        HeroFacing = 1
    }
    if (Hero.tileKindAt(TileDirection.Bottom, sprites.dungeon.hazardLava0)) {
        HeroHealth.value = 0
    } else if (Hero.tileKindAt(TileDirection.Bottom, sprites.dungeon.hazardLava1)) {
        HeroHealth.value = 0
    } else if (Hero.tileKindAt(TileDirection.Bottom, sprites.dungeon.hazardWater)) {
        if (powers[1] == 0) {
            HeroHealth.value = 0
        }
    } else if (Hero.tileKindAt(TileDirection.Bottom, assets.tile`myTile0`)) {
        HeroHealth.value = 0
    }
    if (HeroHealth.value <= 0) {
        Hero.destroy()
        Icon.destroy()
        tiles.setTileAt(HeroSpawn, assets.tile`PlayerSpawn1`)
        spawnPlayer()
        scene.cameraShake(7, 1000)
        if (info.score() > 1000) {
            info.changeScoreBy(-1000)
        } else {
            info.setScore(0)
        }
    }
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Hero.vy == 0) {
        Hero.vy = -180
    } else if (Hero.vy != 0) {
        if (canDoubleJump == 1) {
            Hero.vy = -140
            canDoubleJump = 0
            scene.cameraShake(4, 100)
        }
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.EnemyT2, function (sprite, otherSprite) {
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += HeroDamage * -1
    sprite.destroy()
})
function loopSpriteOffscreen () {
    for (let value of tiles.getTilesByType(assets.tile`EnemySpawnT0`)) {
        if (tiles.locationXY(value, tiles.XY.x) - Hero.x < 100 && tiles.locationXY(value, tiles.XY.x) - Hero.x > -100) {
            if (tiles.locationXY(value, tiles.XY.y) - Hero.y < 100 && tiles.locationXY(value, tiles.XY.y) - Hero.y > -100) {
                EnemyT1S = sprites.create(assets.image`EnemyT1`, SpriteKind.EnemyT1)
                animation.attachAnimation(EnemyT1S, EnemyT1Animations[0])
                animation.attachAnimation(EnemyT1S, EnemyT1Animations[1])
                tiles.placeOnTile(EnemyT1S, value)
                EnemyT1S.y += -8
                tiles.setTileAt(value, assets.tile`transparency16`)
                EnemyHP = statusbars.create(20, 2, StatusBarKind.EnemyHealth)
                EnemyHP.max = EnemyT1Stats[1]
                EnemyHP.value = EnemyT1Stats[1]
                EnemyHP.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
                EnemyHP.attachToSprite(EnemyT1S)
                EnemyT1S.ay = 300
            }
        }
    }
    for (let value2 of tiles.getTilesByType(assets.tile`EnemySpawnT1`)) {
        if (tiles.locationXY(value2, tiles.XY.x) - Hero.x < 100 && tiles.locationXY(value2, tiles.XY.x) - Hero.x > -100) {
            if (tiles.locationXY(value2, tiles.XY.y) - Hero.y < 100 && tiles.locationXY(value2, tiles.XY.y) - Hero.y > -100) {
                EnemyT2S = sprites.create(assets.image`EnemyT1`, SpriteKind.EnemyT2)
                animation.attachAnimation(EnemyT2S, EnemyT2Animations[0])
                animation.attachAnimation(EnemyT2S, EnemyT2Animations[1])
                tiles.placeOnTile(EnemyT2S, value2)
                EnemyT2S.y += -8
                tiles.setTileAt(value2, assets.tile`transparency16`)
                EnemyHP = statusbars.create(20, 2, StatusBarKind.EnemyHealth)
                EnemyHP.max = EnemyT2Stats[1]
                EnemyHP.value = EnemyT2Stats[1]
                EnemyHP.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
                EnemyHP.attachToSprite(EnemyT2S)
                EnemyT2S.ay = 300
            }
        }
    }
    for (let value3 of tiles.getTilesByType(assets.tile`EnemySpawnT3`)) {
        if (tiles.locationXY(value3, tiles.XY.x) - Hero.x < 100 && tiles.locationXY(value3, tiles.XY.x) - Hero.x > -100) {
            if (tiles.locationXY(value3, tiles.XY.y) - Hero.y < 100 && tiles.locationXY(value3, tiles.XY.y) - Hero.y > -100) {
                EnemyT3S = sprites.create(assets.image`EnemyT1`, SpriteKind.EnemyT3)
                animation.attachAnimation(EnemyT3S, EnemyT3Animations[0])
                animation.attachAnimation(EnemyT3S, EnemyT3Animations[1])
                tiles.placeOnTile(EnemyT3S, value3)
                EnemyT3S.y += -8
                tiles.setTileAt(value3, assets.tile`transparency16`)
                EnemyHP = statusbars.create(20, 2, StatusBarKind.EnemyHealth)
                EnemyHP.max = EnemyT3Stats[1]
                EnemyHP.value = EnemyT3Stats[1]
                EnemyHP.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
                EnemyHP.attachToSprite(EnemyT3S)
                EnemyT3S.ay = 300
            }
        }
    }
    for (let value4 of sprites.allOfKind(SpriteKind.EnemyT1)) {
        if (value4.x - Hero.x > 200 || value4.x - Hero.x < -200 || (value4.y - Hero.y > 200 || value4.y - Hero.y < -200)) {
            tiles.setTileAt(tiles.locationOfSprite(value4), assets.tile`EnemySpawnT0`)
            value4.destroy()
        }
    }
    for (let value5 of sprites.allOfKind(SpriteKind.EnemyT2)) {
        if (value5.x - Hero.x > 200 || value5.x - Hero.x < -200 || (value5.y - Hero.y > 200 || value5.y - Hero.y < -200)) {
            tiles.setTileAt(tiles.locationOfSprite(value5), assets.tile`EnemySpawnT1`)
            value5.destroy()
        }
    }
    for (let value6 of sprites.allOfKind(SpriteKind.EnemyT3)) {
        if (value6.x - Hero.x > 200 || value6.x - Hero.x < -200 || (value6.y - Hero.y > 200 || value6.y - Hero.y < -200)) {
            tiles.setTileAt(tiles.locationOfSprite(value6), assets.tile`EnemySpawnT3`)
            value6.destroy()
        }
    }
    for (let value7 of sprites.allOfKind(SpriteKind.Projectile)) {
        if (value7.x - Hero.x > 100 || value7.x - Hero.x < -100) {
            value7.destroy()
        }
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    timer.throttle("", 500, function () {
        HeroAttacking = 1
        if (powers[0] == 1 && (powers[1] == 0 && (powers[2] == 0 && powers[3] == 0))) {
            if (HeroFacing == -1) {
                Fireball = sprites.create(assets.image`FireT1L`, SpriteKind.Projectile)
            } else if (HeroFacing == 1) {
                Fireball = sprites.create(assets.image`FireT1Right`, SpriteKind.Projectile)
            }
            HeroDamage = 10
        } else if (powers[0] == 1 && (powers[1] == 1 && (powers[2] == 0 && powers[3] == 0))) {
            if (HeroFacing == -1) {
                Fireball = sprites.create(assets.image`FireT2L`, SpriteKind.Projectile)
            } else if (HeroFacing == 1) {
                Fireball = sprites.create(assets.image`FireT2R`, SpriteKind.Projectile)
            }
            HeroDamage = 20
        } else if (powers[0] == 1 && (powers[1] == 1 && (powers[2] == 1 && powers[3] == 0))) {
            if (HeroFacing == -1) {
                Fireball = sprites.create(assets.image`FireT3L`, SpriteKind.Projectile)
            } else if (HeroFacing == 1) {
                Fireball = sprites.create(assets.image`FireT3R`, SpriteKind.Projectile)
            }
            HeroDamage = 30
        } else if (powers[0] == 1 && (powers[1] == 1 && (powers[2] == 1 && powers[3] == 1))) {
            if (HeroFacing == -1) {
                Fireball = sprites.create(assets.image`FireT4L`, SpriteKind.Projectile)
            } else if (HeroFacing == 1) {
                Fireball = sprites.create(assets.image`FireT4R`, SpriteKind.Projectile)
            }
            HeroDamage = 50
        }
        Fireball.setPosition(Hero.x, Hero.y)
        Fireball.vx = 150 * HeroFacing
        timer.after(200, function () {
            HeroAttacking = 0
        })
    })
})
function loopEnemyControl () {
    for (let value8 of sprites.allOfKind(SpriteKind.EnemyT1)) {
        if (Hero.x - value8.x < 0) {
            animation.setAction(value8, ActionKind.WalkingLeft)
            value8.vx = EnemyT1Stats[0] * -1
        } else if (Hero.x - value8.x > 0) {
            animation.setAction(value8, ActionKind.WalkingRight)
            value8.vx = EnemyT1Stats[0]
        }
        if (Hero.overlapsWith(value8)) {
            if (HeroI == 0) {
                HeroHealth.value += EnemyT1Stats[2] * -1
                HeroI = 1
                if (Hero.x - value8.x < 0) {
                    Hero.vx = -100
                } else if (Hero.x - value8.x > 0) {
                    Hero.vx = 100
                }
                Hero.vy = -100
            }
            timer.after(100, function () {
                Hero.vx = 0
            })
            timer.after(500, function () {
                HeroI = 0
            })
        }
        if (statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, value8).value == 0) {
            value8.startEffect(effects.fountain, 500)
            value8.destroy()
            info.changeScoreBy(250)
        }
    }
    for (let value9 of sprites.allOfKind(SpriteKind.EnemyT2)) {
        if (Hero.x - value9.x < 0) {
            animation.setAction(value9, ActionKind.WalkingLeft)
            value9.vx = EnemyT2Stats[0] * -1
        } else if (Hero.x - value9.x > 0) {
            animation.setAction(value9, ActionKind.WalkingRight)
            value9.vx = EnemyT2Stats[0]
        }
        if (Hero.overlapsWith(value9)) {
            if (HeroI == 0) {
                HeroHealth.value += EnemyT2Stats[2] * -1
                HeroI = 1
                if (Hero.x - value9.x < 0) {
                    Hero.vx = -100
                } else if (Hero.x - value9.x > 0) {
                    Hero.vx = 100
                }
                Hero.vy = -100
            }
            timer.after(100, function () {
                Hero.vx = 0
            })
            timer.after(500, function () {
                HeroI = 0
            })
        }
        if (statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, value9).value == 0) {
            value9.startEffect(effects.fountain, 500)
            value9.destroy()
            info.changeScoreBy(100)
        }
    }
    for (let value10 of sprites.allOfKind(SpriteKind.EnemyT3)) {
        if (Hero.x - value10.x < 0) {
            animation.setAction(value10, ActionKind.WalkingLeft)
            value10.vx = EnemyT3Stats[0] * -1
        } else if (Hero.x - value10.x > 0) {
            animation.setAction(value10, ActionKind.WalkingRight)
            value10.vx = EnemyT3Stats[0]
        }
        if (Hero.overlapsWith(value10)) {
            if (HeroI == 0) {
                HeroHealth.value += EnemyT3Stats[2] * -1
                HeroI = 1
                if (Hero.x - value10.x < 0) {
                    Hero.vx = -100
                } else if (Hero.x - value10.x > 0) {
                    Hero.vx = 100
                }
                Hero.vy = -100
            }
            timer.after(100, function () {
                Hero.vx = 0
            })
            timer.after(500, function () {
                HeroI = 0
            })
        }
        if (statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, value10).value == 0) {
            value10.startEffect(effects.fountain, 500)
            value10.destroy()
            info.changeScoreBy(500)
        }
    }
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.EnemyT3, function (sprite, otherSprite) {
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += HeroDamage * -1
    sprite.destroy()
})
function initVars () {
    HeroAttacking = 0
    HeroFacing = 1
    HeroI = 0
    HeroStats = [50, 200]
    powers = [1, 1, 1, 1]
    EnemyT1Stats = [20, 75, 50]
    EnemyT2Stats = [40, 30, 25]
    EnemyT3Stats = [10, 200, 100]
}
function loopCollectibles () {
    if (Hero.overlapsWith(CrystalT1)) {
        powers = [1, 0, 0, 0]
        CrystalT1.destroy()
        animation.setAction(Icon, ActionKind.S1)
        scene.cameraShake(4, 500)
        info.changeScoreBy(600)
    } else if (Hero.overlapsWith(CrystalT2)) {
        powers = [1, 1, 0, 0]
        CrystalT2.destroy()
        animation.setAction(Icon, ActionKind.S2)
        scene.cameraShake(4, 500)
        info.changeScoreBy(1000)
    } else if (Hero.overlapsWith(CrystalT3)) {
        powers = [1, 1, 1, 0]
        CrystalT3.destroy()
        animation.setAction(Icon, ActionKind.S3)
        scene.cameraShake(4, 500)
        info.changeScoreBy(2000)
    } else if (Hero.overlapsWith(CrystalT4)) {
        powers = [1, 1, 1, 1]
        CrystalT4.destroy()
        animation.setAction(Icon, ActionKind.S4)
        scene.cameraShake(4, 500)
        info.changeScoreBy(5000)
    }
}
function initAnim () {
    let bossAnimations: animation.Animation[] = []
    HeroAnimations[0] = animation.createAnimation(ActionKind.WalkingLeft, 100)
    HeroAnimations[0].addAnimationFrame(assets.image`HeroWalkL0`)
    HeroAnimations[0].addAnimationFrame(assets.image`HeroWalkL1`)
    HeroAnimations[0].addAnimationFrame(assets.image`HeroWalkL2`)
    HeroAnimations[0].addAnimationFrame(assets.image`HeroWalkL3`)
    HeroAnimations[0].addAnimationFrame(assets.image`HeroWalkL4`)
    HeroAnimations[0].addAnimationFrame(assets.image`HeroWalkL5`)
    HeroAnimations[0].addAnimationFrame(assets.image`HeroWalkL6`)
    HeroAnimations[0].addAnimationFrame(assets.image`HeroWalkL7`)
    HeroAnimations[1] = animation.createAnimation(ActionKind.WalkingRight, 100)
    HeroAnimations[1].addAnimationFrame(assets.image`HeroWalkR0`)
    HeroAnimations[1].addAnimationFrame(assets.image`HeroWalkR1`)
    HeroAnimations[1].addAnimationFrame(assets.image`HeroWalkR2`)
    HeroAnimations[1].addAnimationFrame(assets.image`HeroWalkR3`)
    HeroAnimations[1].addAnimationFrame(assets.image`HeroWalkR4`)
    HeroAnimations[1].addAnimationFrame(assets.image`HeroWalkR5`)
    HeroAnimations[1].addAnimationFrame(assets.image`HeroWalkR6`)
    HeroAnimations[1].addAnimationFrame(assets.image`HeroWalkR7`)
    HeroAnimations[2] = animation.createAnimation(ActionKind.IdleLeft, 100)
    HeroAnimations[2].addAnimationFrame(assets.image`HeroIdleL0`)
    HeroAnimations[3] = animation.createAnimation(ActionKind.IdleRight, 100)
    HeroAnimations[3].addAnimationFrame(assets.image`HeroIdleR0`)
    HeroAnimations[4] = animation.createAnimation(ActionKind.JumpingLeft, 100)
    HeroAnimations[4].addAnimationFrame(assets.image`HeroJumpL0`)
    HeroAnimations[5] = animation.createAnimation(ActionKind.JumpingRight, 100)
    HeroAnimations[5].addAnimationFrame(assets.image`HeroJumpR0`)
    HeroAnimations[6] = animation.createAnimation(ActionKind.AttackingLeft, 100)
    HeroAnimations[6].addAnimationFrame(assets.image`HeroAttackL0`)
    HeroAnimations[7] = animation.createAnimation(ActionKind.AttackingRight, 100)
    HeroAnimations[7].addAnimationFrame(assets.image`HeroAttackR0`)
    EnemyT1Animations[0] = animation.createAnimation(ActionKind.WalkingLeft, 100)
    EnemyT1Animations[0].addAnimationFrame(assets.image`EnemyT1WalkL`)
    EnemyT1Animations[1] = animation.createAnimation(ActionKind.WalkingRight, 100)
    EnemyT1Animations[1].addAnimationFrame(assets.image`EnemyT1WalkR`)
    EnemyT2Animations[0] = animation.createAnimation(ActionKind.WalkingLeft, 100)
    EnemyT2Animations[0].addAnimationFrame(assets.image`EnemyT2WalkL`)
    EnemyT2Animations[1] = animation.createAnimation(ActionKind.WalkingRight, 100)
    EnemyT2Animations[1].addAnimationFrame(assets.image`EnemyT2WalkR`)
    EnemyT3Animations[0] = animation.createAnimation(ActionKind.WalkingLeft, 100)
    EnemyT3Animations[0].addAnimationFrame(assets.image`EnemyT3WalkL`)
    EnemyT3Animations[1] = animation.createAnimation(ActionKind.WalkingRight, 100)
    EnemyT3Animations[1].addAnimationFrame(assets.image`EnemyT3WalkR`)
    IconFrames[0] = animation.createAnimation(ActionKind.S1, 100)
    IconFrames[0].addAnimationFrame(assets.image`icon0`)
    IconFrames[1] = animation.createAnimation(ActionKind.S2, 100)
    IconFrames[1].addAnimationFrame(assets.image`Icon1`)
    IconFrames[2] = animation.createAnimation(ActionKind.S3, 100)
    IconFrames[2].addAnimationFrame(assets.image`Icon2`)
    IconFrames[3] = animation.createAnimation(ActionKind.S4, 100)
    IconFrames[3].addAnimationFrame(assets.image`Icon4`)
    bossAnimations[0] = animation.createAnimation(ActionKind.WalkingLeft, 100)
    IconFrames[0].addAnimationFrame(img`
        ................................................
        ................................................
        ................................................
        ................................................
        ................................................
        ................................................
        ................................................
        ................................................
        ................................................
        ................................................
        ................................................
        ................................................
        ................................................
        ................................................
        ................................................
        ................................................
        ................................................
        ................................................
        ................................................
        ................................................
        ................................................
        ................................................
        ................................................
        ................................................
        ................................................
        ................................................
        ................................................
        ................................................
        ................................................
        ...............................f................
        ...............................f................
        ...............................f................
        ..............................ff................
        ............................fff.................
        ............................ff..................
        ............................f...................
        ...................ffffffffff...................
        ...................ffffffffff...................
        ...................ffffffffff...................
        ...................ffffffffff...................
        ...................fff...ffff...................
        ...................fff....ffff..................
        ...................fff.....fff..................
        ...................fff.....fff..................
        ....................fff....ffff.................
        ....................fff.....fff.................
        ....................fff.....fff.................
        ....................fff.....fff.................
        `)
    bossAnimations[0] = animation.createAnimation(ActionKind.WalkingRight, 100)
}
function loopHeroAnims () {
    if (HeroAttacking == 0) {
        if (Hero.vy == 0) {
            if (Hero.vx == 0) {
                if (HeroFacing == -1) {
                    animation.setAction(Hero, ActionKind.IdleLeft)
                } else if (HeroFacing == 1) {
                    animation.setAction(Hero, ActionKind.IdleRight)
                }
            } else {
                if (HeroFacing == -1) {
                    animation.setAction(Hero, ActionKind.WalkingLeft)
                } else if (HeroFacing == 1) {
                    animation.setAction(Hero, ActionKind.WalkingRight)
                }
            }
        } else {
            if (HeroFacing == -1) {
                animation.setAction(Hero, ActionKind.JumpingLeft)
            } else if (HeroFacing == 1) {
                animation.setAction(Hero, ActionKind.JumpingRight)
            }
        }
    } else {
        if (HeroFacing == -1) {
            animation.setAction(Hero, ActionKind.AttackingLeft)
        } else if (HeroFacing == 1) {
            animation.setAction(Hero, ActionKind.AttackingRight)
        }
    }
}
scene.onHitWall(SpriteKind.Projectile, function (sprite, location) {
    if (powers[3] == 1) {
        if (sprite.tileKindAt(TileDirection.Left, assets.tile`DestructibleTop`) || sprite.tileKindAt(TileDirection.Right, assets.tile`DestructibleTop`)) {
            tiles.setTileAt(location, assets.tile`transparency16`)
            tiles.setWallAt(location, false)
            sprite.startEffect(effects.disintegrate)
            sprite.destroy()
            scene.cameraShake(5, 500)
        } else if (sprite.tileKindAt(TileDirection.Left, assets.tile`DestrucyibleBottom0`) || sprite.tileKindAt(TileDirection.Right, assets.tile`DestrucyibleBottom0`)) {
            tiles.setTileAt(location, assets.tile`transparency16`)
            tiles.setWallAt(location, false)
            sprite.startEffect(effects.disintegrate)
            sprite.destroy()
            scene.cameraShake(5, 500)
        } else {
            sprite.startEffect(effects.ashes)
            sprite.destroy()
        }
    } else {
        sprite.startEffect(effects.ashes)
        sprite.destroy()
    }
})
function spawnPlayer () {
    for (let value11 of tiles.getTilesByType(assets.tile`PlayerSpawn1`)) {
        HeroSpawn = tiles.getTilesByType(assets.tile`PlayerSpawn1`)[0]
        Hero = sprites.create(assets.image`Hero`, SpriteKind.Player)
        controller.moveSprite(Hero, 50, 0)
        animation.attachAnimation(Hero, HeroAnimations[0])
        animation.attachAnimation(Hero, HeroAnimations[1])
        animation.attachAnimation(Hero, HeroAnimations[2])
        animation.attachAnimation(Hero, HeroAnimations[3])
        animation.attachAnimation(Hero, HeroAnimations[4])
        animation.attachAnimation(Hero, HeroAnimations[5])
        animation.attachAnimation(Hero, HeroAnimations[6])
        animation.attachAnimation(Hero, HeroAnimations[7])
        tiles.placeOnTile(Hero, value11)
        tiles.setTileAt(value11, assets.tile`transparency16`)
        Hero.y += -8
        scene.cameraFollowSprite(Hero)
        Hero.setStayInScreen(true)
        Icon = sprites.create(assets.image`icon0`, SpriteKind.iconBar)
        Icon.setStayInScreen(true)
        animation.attachAnimation(Icon, IconFrames[0])
        animation.attachAnimation(Icon, IconFrames[1])
        animation.attachAnimation(Icon, IconFrames[2])
        animation.attachAnimation(Icon, IconFrames[3])
        HeroHealth = statusbars.create(70, 8, StatusBarKind.Health)
        HeroHealth.max = HeroStats[1]
        HeroHealth.value = HeroStats[1]
        HeroHealth.setColor(7, 13, 6)
        HeroHealth.setBarBorder(1, 13)
        HeroHealth.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
        HeroHealth.positionDirection(CollisionDirection.Top)
    }
}
function initLevel () {
    tiles.setTilemap(tilemap`level2`)
    scene.setBackgroundColor(11)
    spawnPlayer()
    info.setScore(0)
    for (let value12 of tiles.getTilesByType(assets.tile`CrystalT0`)) {
        CrystalT1 = sprites.create(assets.image`CrystalT1`, SpriteKind.Crystal)
        tiles.placeOnTile(CrystalT1, value12)
        tiles.setTileAt(value12, assets.tile`transparency16`)
    }
    for (let value13 of tiles.getTilesByType(assets.tile`CrystalT1`)) {
        CrystalT2 = sprites.create(assets.image`CrystalT2`, SpriteKind.Crystal)
        tiles.placeOnTile(CrystalT2, value13)
        tiles.setTileAt(value13, assets.tile`transparency16`)
    }
    for (let value14 of tiles.getTilesByType(assets.tile`CrystalT2`)) {
        CrystalT3 = sprites.create(assets.image`CrystalT3`, SpriteKind.Crystal)
        tiles.placeOnTile(CrystalT3, value14)
        tiles.setTileAt(value14, assets.tile`transparency16`)
    }
    for (let value15 of tiles.getTilesByType(assets.tile`CrystalT4`)) {
        CrystalT4 = sprites.create(assets.image`CrystalT4`, SpriteKind.Crystal)
        tiles.placeOnTile(CrystalT4, value15)
        tiles.setTileAt(value15, assets.tile`transparency16`)
    }
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.EnemyT1, function (sprite, otherSprite) {
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += HeroDamage * -1
    sprite.destroy()
})
let IconFrames: animation.Animation[] = []
let HeroAnimations: animation.Animation[] = []
let CrystalT4: Sprite = null
let CrystalT3: Sprite = null
let CrystalT2: Sprite = null
let CrystalT1: Sprite = null
let HeroStats: number[] = []
let HeroI = 0
let Fireball: Sprite = null
let HeroAttacking = 0
let EnemyT3Stats: number[] = []
let EnemyT3Animations: animation.Animation[] = []
let EnemyT3S: Sprite = null
let EnemyT2Stats: number[] = []
let EnemyT2Animations: animation.Animation[] = []
let EnemyT2S: Sprite = null
let EnemyT1Stats: number[] = []
let EnemyHP: StatusBarSprite = null
let EnemyT1Animations: animation.Animation[] = []
let EnemyT1S: Sprite = null
let HeroDamage = 0
let HeroSpawn: tiles.Location = null
let HeroHealth: StatusBarSprite = null
let HeroFacing = 0
let canDoubleJump = 0
let powers: number[] = []
let Hero: Sprite = null
let Icon: Sprite = null
initAnim()
initVars()
initLevel()
game.onUpdate(function () {
    loopHeroMovement()
    loopHeroAnims()
    loopSpriteOffscreen()
    loopEnemyControl()
    loopCollectibles()
})
