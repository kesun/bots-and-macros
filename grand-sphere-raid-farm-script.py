from com.android.monkeyrunner import MonkeyRunner, MonkeyDevice, MonkeyImage
from time import sleep
from random import randint, uniform
import sys

device = MonkeyRunner.waitForConnection()

# might not need this
package = 'jp.co.siliconstudio.wwgrandsphere'

EXEC_LIMIT = 1000

BOSS_SEARCH = (805, 1346)
BOSS_EVENT_QUEST = (543, 938)
BOSS_SEARCH_CLOSE = (530, 1296)
BOSS_SEARCH_ASSISTANT = (892, 1724)
BOSS_GO = (559, 1460)
BOSS_SPEND_AP = (768, 1116)

BOSS_LATER = (337, 1447)

BOSS_SETUP = (810, 1367)
BOSS_ZERO_BP = (171, 1491)
BOSS_FIGHT_ASSISTANT = (873, 1701)
BOSS_START = (531, 1629)

BOSS_FAIL_OK = (511, 1094)
BOSS_CALL_ALLIES = (153, 1661)
BOSS_FRIENDS = (345, 997)
BOSS_CALLED_OK = (528, 1225)
BOSS_EVENT_TOP = (935, 1816)

BOSS_ALLY_REQUESTS = (247, 1344)
BOSS_FIRST_REQUEST = (526, 285)
BOSS_FLED = (555, 1083)

EVENT_SHOP = (520, 1839)

# SITUATIONALS
ELENA_POS_SWITCH = [(549, 1312), (88, 1292)]

# COLOURS
FIRE_WING = (-1, 222, 26, 3)
LIGHT_WING = (-1, 119, 79, 3)
WATER_WING = (-1, 6, 113, 122)

ALLY_FIRE_WING = (-1, 170, 66, 43)
ALLY_LIGHT_WING = (-1, 134, 96, 15)
ALLY_WATER_WING = (-1, 71, 93, 164)

FAIL_OK_BUTTON = (-1, 193, 55, 49)
BOSS_GONE_BUTTON = (-1, 170, 52, 45)
HAS_ASSISTS = (-1, 196, 76, 53)
ACTIVE_REQUEST = (-1, 119, 61, 55)
MY_UNFINISHED_BOSS = (-1, 123, 78, 41)
AP_GREEN = (-1, 81, 156, 25)
EMPTY_BAR = (-1, 140, 140, 132)

# GENERIC STATICS
BATTLE = (571, 1833)
POST_BATTLE_BLANKS = (708, 1716)
BACK = (155, 1844)

# COMMON FUNCS
def touch(coord):
	device.touch(coord[0], coord[1], 'DOWN_AND_UP')

def drag(coords):
	device.drag(coords[0], coords[1], 0.2)

def allSkill():
	y1 = 1314
	y2 = 921
	for x in [104, 307, 530, 772, 975]:
		drag([(x, y1), (x, y2)])
		sleep(0.5)

# COMMON ACTIONS
def clickies(n):
	for i in range(0, n):
		newBlank = (randint(POST_BATTLE_BLANKS[0] - 5, POST_BATTLE_BLANKS[0] + 5), randint(POST_BATTLE_BLANKS[1] - 5, POST_BATTLE_BLANKS[1] + 5))
		touch(newBlank)
		sleep(uniform(1.3, 1.6))

def simpleBattle():
	sleep(8)
	touch(BATTLE)
	sleep(7)
	touch(BATTLE)
	sleep(9)
	touch(BATTLE)
	# battle finishes
	sleep(12)
	clickies(8)

# RAID ACTIONS
def checkBossGone():
	newimage = device.takeSnapshot()
	pixel = newimage.getRawPixel(515, 1117)

	sleep(2)
	if (pixel == BOSS_GONE_BUTTON):
		print ('boss fled')
		touch(BOSS_FLED)
		sleep(5)
		return True
	return False

def checkBattleFail():
	newimage = device.takeSnapshot()
	pixel = newimage.getRawPixel(669, 1108)

	return pixel == FAIL_OK_BUTTON

def postBattleActions():
	sleep(1)
	if (checkBattleFail()):
		touch(BOSS_FAIL_OK)
		sleep(4)
		touch((942, 1100))
		sleep(3)
		touch(BOSS_CALL_ALLIES)
		sleep(1)
		touch(BOSS_FRIENDS)
		sleep(4)
		touch(BOSS_CALLED_OK)
		sleep(1)
		touch(BOSS_EVENT_TOP)
	else:
		clickies(4)
		touch(BOSS_EVENT_TOP)
		sleep(4)

def fireBossFight():
	sleep(8)
	drag(ELENA_POS_SWITCH)
	sleep(1)
	touch(BATTLE)
	sleep(7)
	touch(BATTLE)
	sleep(6)
	touch(BATTLE)
	sleep(6)
	touch(BATTLE)
	sleep(12)
	allSkill()
	sleep(1)
	touch(BATTLE)
	sleep(18)

	postBattleActions()

def waterBossFight():
	sleep(8)
	drag(ELENA_POS_SWITCH)
	sleep(1)
	touch(BATTLE)
	sleep(7)
	touch(BATTLE)
	sleep(10)
	touch(BATTLE)
	sleep(9)
	touch(BATTLE)
	sleep(15)
	allSkill()
	sleep(1)
	touch(BATTLE)
	sleep(8)

	postBattleActions()

def lightBossFight():
	sleep(8)
	drag(ELENA_POS_SWITCH)
	sleep(1)
	touch(BATTLE)
	sleep(7)
	touch(BATTLE)
	sleep(10)
	touch(BATTLE)
	sleep(9)
	allSkill()
	sleep(1)
	touch(BATTLE)
	sleep(15)
	touch(BATTLE)
	sleep(8)

	postBattleActions()

def searchBoss():
	sleep(1)
	touch(BOSS_SEARCH)
	sleep(3)

	newimage = device.takeSnapshot()
	APpixel = newimage.getRawPixel(454, 953)

	#print (APpixel)
	#print (EMPTY_BAR)

	if (APpixel == EMPTY_BAR):
		return False

	touch(BOSS_EVENT_QUEST)
	sleep(6)
	touch(BOSS_SEARCH_ASSISTANT)
	sleep(3)
	touch(BOSS_GO)
	sleep(1)
	touch(BOSS_SPEND_AP)
	return True

def bossFound():
	sleep(5)
	touch(BOSS_LATER)
	sleep(5)

def setupOwnBoss():
	touch(BOSS_SETUP)
	sleep(4)
	touch(BOSS_ZERO_BP)
	sleep(6)
	touch(BOSS_FIGHT_ASSISTANT)
	sleep(2)
	touch(BOSS_START)

def search():
	canSearch = searchBoss()

	if (not canSearch):
		sleep(1)
		print ('insufficient AP')
		touch(BOSS_SEARCH_CLOSE)
		sleep(2)
		return False

	simpleBattle()
	bossFound()

	sleep(2)
	newimage = device.takeSnapshot()
	wingPixel = newimage.getRawPixel(250, 1143)
	print(wingPixel)
	print(FIRE_WING)
	print(LIGHT_WING)
	print(WATER_WING)
	#return
	setupOwnBoss()
	if (wingPixel == FIRE_WING):
		fireBossFight()
	elif (wingPixel == LIGHT_WING):
		lightBossFight()
	elif (wingPixel == WATER_WING):
		waterBossFight()
	else:
		raise

	print('left search')
	return True

def allyRequest():
	sleep(1)
	touch(BOSS_ALLY_REQUESTS)
	sleep(4)

	newimage = device.takeSnapshot()
	pixel = newimage.getRawPixel(990, 284)

	if (pixel == ACTIVE_REQUEST):
		pixel = newimage.getRawPixel(250, 225)
		print (pixel)
		print (ALLY_FIRE_WING)
		print (ALLY_LIGHT_WING)
		print (ALLY_WATER_WING)
		#return
		touch(BOSS_FIRST_REQUEST)
		if (checkBossGone()):
			return
		sleep(3)
		touch(BOSS_ZERO_BP)
		if (checkBossGone()):
			return
		sleep(4)
		touch(BOSS_FIGHT_ASSISTANT)
		sleep(2)
		touch(BOSS_START)
		if (checkBossGone()):
			return
		if (pixel == ALLY_FIRE_WING):
			fireBossFight()
		elif (pixel == ALLY_LIGHT_WING):
			lightBossFight()
		elif (pixel == ALLY_WATER_WING):
			waterBossFight()
		else:
			raise

	else:
		touch(BACK) # exit ally request page

	print('left allyRequest')

def refresh():
	touch(BOSS_ALLY_REQUESTS)
	sleep(5)
	touch(BACK)
	sleep(5)


def start():
	global EXEC_LIMIT
	newimage = device.takeSnapshot()
	bubblePixel = newimage.getRawPixel(71, 1308)
	print(EXEC_LIMIT)

	if (bubblePixel == HAS_ASSISTS):
		allyRequest()

	else:
		setupPixel = newimage.getRawPixel(990, 1348)
		print (setupPixel)
		print (MY_UNFINISHED_BOSS)
		if (setupPixel != MY_UNFINISHED_BOSS):
			successfulSearch = search()
			if (not successfulSearch):
				refresh()
		else:
			sleep(10)
			refresh()

	if (EXEC_LIMIT > 0):
		EXEC_LIMIT = EXEC_LIMIT - 1
		start()

# magic starts here
start()
