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
RESTORE_BP = (922, 1648)
USE_BP_POTION = (751, 1290)
USE_BP_POTION_OK = (533, 1183)

# SITUATIONALS
ELENA_POS_SWITCH = [(549, 1312), (88, 1292)]

# COLOURS
FIRE_WING = (-1, 220, 26, 3)
LIGHT_WING = (-1, 119, 79, 3)
WATER_WING = (-1, 6, 113, 122)
UBER_WING = (-1, 245, 150, 7)

ALLY_FIRE_WING = (-1, 170, 66, 43)
ALLY_LIGHT_WING = (-1, 132, 93, 12)
ALLY_WATER_WING = (-1, 71, 93, 164)
ALLY_UBER_WING = (-1, 102, 54, 19)

FAIL_OK_BUTTON = (-1, 193, 55, 49)
BOSS_GONE_BUTTON = (-1, 170, 52, 45)
HAS_ASSISTS = (-1, 196, 76, 53)
ACTIVE_REQUEST = (-1, 119, 61, 55)
MY_UNFINISHED_BOSS = (-1, 159, 98, 193)
CAN_SEARCH = (-1, 114, 38, 32)
AP_GREEN = (-1, 81, 156, 25)
EMPTY_BAR = (-1, 140, 140, 132)
HAS_BP = (-1, 35, 66, 74)

# GENERIC STATICS
BATTLE = (571, 1910)
POST_BATTLE_BLANKS = (708, 1716)
BACK = (155, 1844)

# COMMON FUNCS
def touch(coord):
	device.touch(coord[0], coord[1], 'DOWN_AND_UP')

def drag(coords):
	device.drag(coords[0], coords[1], 0.2)

def isColourSimilar(pixel, ref):
	r = pixel[1] < ref[1] + 5 and pixel[1] > ref[1] - 5
	g = pixel[2] < ref[2] + 5 and pixel[2] > ref[2] - 5
	b = pixel[3] < ref[3] + 5 and pixel[3] > ref[3] - 5
	return r and g and b

def allSkill():
	y1 = 1314
	y2 = 921
	for x in [104, 307, 530, 772, 975]:
		drag([(x, y1), (x, y2)])
		sleep(0.5)

# COMMON ACTIONS
def clickies(n):
	for i in range(0, n):
		newBlank = (randint(POST_BATTLE_BLANKS[0] - 10, POST_BATTLE_BLANKS[0] + 10), randint(POST_BATTLE_BLANKS[1] - 10, POST_BATTLE_BLANKS[1] + 10))
		touch(newBlank)
		sleep(uniform(1, 1.5))

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

	return pixel == FAIL_OK_BUTTON or pixel == (-1, 219, 122, 107)

def postBattleActions():
	sleep(1)
	if (checkBattleFail()):
		print ('boss failed')
		touch(BOSS_FAIL_OK)
		sleep(4)
		touch((942, 1100))
		sleep(4)
		touch(BOSS_CALL_ALLIES)
		sleep(1)
		touch(BOSS_FRIENDS)
		sleep(5)
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

def uberBossFight():
	sleep(8)
	drag(ELENA_POS_SWITCH)
	sleep(1)
	touch(BATTLE)
	sleep(9)
	touch(BATTLE)
	sleep(9)
	touch(BATTLE)
	sleep(8)
	touch(BATTLE)
	sleep(8)
	allSkill()
	sleep(1)
	touch(BATTLE)
	sleep(15)

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
	sleep(4)
	touch(BOSS_LATER)
	sleep(5)

def setupOwnBoss():
	touch(BOSS_SETUP)
	sleep(4)

	newimage = device.takeSnapshot()
	pixel = newimage.getRawPixel(BOSS_ZERO_BP[0], BOSS_ZERO_BP[1])
	if (pixel != HAS_BP):
		touch(RESTORE_BP)
		sleep(1)
		touch(USE_BP_POTION)
		sleep(2)
		touch(USE_BP_POTION_OK)
		sleep(1)


	touch(BOSS_ZERO_BP)
	sleep(6)
	touch(BOSS_FIGHT_ASSISTANT)
	sleep(2)
	touch(BOSS_START)

def fightBoss(wingPixel, isFromAlly=False):
	print('check boss type')
	print('my boss wing colour')
	print(wingPixel)
	if (isColourSimilar(wingPixel, ALLY_FIRE_WING if isFromAlly else FIRE_WING)):
		fireBossFight()
	elif (isColourSimilar(wingPixel, ALLY_LIGHT_WING if isFromAlly else LIGHT_WING)):
		lightBossFight()
	elif (isColourSimilar(wingPixel, ALLY_WATER_WING if isFromAlly else WATER_WING)):
		waterBossFight()
	elif (isColourSimilar(wingPixel, ALLY_UBER_WING if isFromAlly else UBER_WING)):
		uberBossFight()
	else:
		print ('new wing colour!')
		print (wingPixel)
		raise
		return False

	print('boss fight complete')

	postBattleActions()

def getMyBossWingColour(coords, img):
	return img.getRawPixel(coords[0], coords[1])

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

	sleep(3)
	newimage = device.takeSnapshot()
	setupPixel = newimage.getRawPixel(699, 1366)
	if (setupPixel != CAN_SEARCH):
		wingPixel = getMyBossWingColour((250, 1143), newimage)
		setupOwnBoss()
		fightBoss(wingPixel)

def allyRequest():
	sleep(1)
	touch(BOSS_ALLY_REQUESTS)
	sleep(4)

	newimage = device.takeSnapshot()
	pixel = newimage.getRawPixel(990, 284)

	if (pixel == ACTIVE_REQUEST):
		pixel = newimage.getRawPixel(250, 225)
		touch(BOSS_FIRST_REQUEST)
		if (checkBossGone()):
			return
		sleep(3)

		newimage = device.takeSnapshot()
		pixel = newimage.getRawPixel(BOSS_ZERO_BP[0], BOSS_ZERO_BP[1])
		if (pixel != HAS_BP):
			touch(RESTORE_BP)
			sleep(1)
			touch(USE_BP_POTION)
			sleep(2)
			touch(USE_BP_POTION_OK)
			sleep(1)

		touch(BOSS_ZERO_BP)
		if (checkBossGone()):
			return
		sleep(4)
		touch(BOSS_FIGHT_ASSISTANT)
		sleep(2)
		touch(BOSS_START)
		if (checkBossGone()):
			return
		fightBoss(pixel, True)
	else:
		touch(BACK) # exit ally request page

	print('left allyRequest')

def refresh():
	touch(BOSS_ALLY_REQUESTS)
	sleep(5)
	touch(BACK)
	sleep(5)

def checkRequests():
	sleep(1)
	touch(BOSS_ALLY_REQUESTS)
	sleep(4)

	newimage = device.takeSnapshot()
	x = 250
	y = 200
	yMax = 1600

	while (y < 1600):
		pixel = newimage.getRawPixel(x, y)
		# if (pixel == ALLY_UBER_WING or pixel == ALLY_LIGHT_WING):
		if (isColourSimilar(pixel, ALLY_UBER_WING) or isColourSimilar(pixel, ALLY_LIGHT_WING)):
			print ('found ally light or uber boss')
			touch((x, y))
			if (checkBossGone()):
				break
			sleep(3)

			newimage = device.takeSnapshot()
			pixel = newimage.getRawPixel(BOSS_ZERO_BP[0], BOSS_ZERO_BP[1])
			if (pixel != HAS_BP):
				touch(RESTORE_BP)
				sleep(1)
				touch(USE_BP_POTION)
				sleep(2)
				touch(USE_BP_POTION_OK)
				sleep(1)
			
			touch(BOSS_ZERO_BP)
			if (checkBossGone()):
				break
			sleep(4)
			touch(BOSS_FIGHT_ASSISTANT)
			sleep(2)
			touch(BOSS_START)
			if (checkBossGone()):
				break
			fightBoss(pixel, True)
			return True
		y = y + 1

	touch(BACK)
	return False

def start():
	sleep(3)
	newimage = device.takeSnapshot()
	bubblePixel = newimage.getRawPixel(71, 1308)
	'''
	# ally req wing colour
	print (newimage.getRawPixel(BOSS_ZERO_BP[0], BOSS_ZERO_BP[1]))
	return
	while (y < yMax):
		pixel = newimage.getRawPixel(x, y)
		if (isColourSimilar(pixel, ALLY_UBER_WING)):
			print (pixel)
			print (x)
			print (y)
			device.drag((x, y), (x + 500, y), 2)
			sleep(1)
		y = y + 1
	return
	'''
	if (bubblePixel == HAS_ASSISTS):
		allyRequest()
	else:
		setupPixel = newimage.getRawPixel(699, 1366)
		print ('check my unfinished boss')
		print (setupPixel)
		print (MY_UNFINISHED_BOSS)
		# ========== The stingy way ============
		'''
		if (setupPixel != MY_UNFINISHED_BOSS):
			print ('search for new boss')
			successfulSearch = search()
			print ("search successful?")
			print (successfulSearch)
			if (not successfulSearch):
				refresh()
		'''
		# =========================================
		# ========== The expensive way ============
		# Manage my own
		if (setupPixel == CAN_SEARCH):
			print ('search for new boss')
			successfulSearch = search()
			if (not successfulSearch):
				checkOpenReq = checkRequests()
				if (not checkOpenReq):
					wingPixel = getMyBossWingColour((250, 1143), newimage)
					setupOwnBoss()
					fightBoss(wingPixel)

		elif (setupPixel == MY_UNFINISHED_BOSS):
			checkOpenReq = checkRequests()
			if (not checkOpenReq):
				wingPixel = getMyBossWingColour((250, 1143), newimage)
				setupOwnBoss()
				fightBoss(wingPixel)
		# ======================================
		else:
			sleep(10)
			refresh()

# magic starts here
# start()

while (EXEC_LIMIT > 0):
	print(EXEC_LIMIT)
	EXEC_LIMIT = EXEC_LIMIT - 1
	start()

