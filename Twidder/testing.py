from selenium import webdriver
import time


#Open browsers
browser = webdriver.Firefox()
browser.get('http://127.0.0.1:5000/')

browser2 = webdriver.Chrome()
browser2.get('localhost:5000/')


#Sign in
browser.find_element_by_id('loginemail').send_keys("A@A")
browser.find_element_by_id('loginpassword').send_keys("123123123")
time.sleep(5)
browser.find_element_by_id('loginButton').click()

browser2.find_element_by_id('loginemail').send_keys("A@B")
browser2.find_element_by_id('loginpassword').send_keys("123123123")
time.sleep(5)
browser2.find_element_by_id('loginButton').click()

#Post message (my wall)
time.sleep(5)
browser2.find_element_by_id('inputmessage').send_keys("This is a test message on my wall")
browser2.find_element_by_id('postmessagebutton').click()

#Change tab, search for user
browser.find_element_by_id('browsebutton').click()
browser.find_element_by_id('searchemail').send_keys("A@B")
time.sleep(5)
browser.find_element_by_id('searchButton').click()

#Post message on another users wall
browser.find_element_by_id('inputmessage2').send_keys("This is a message on another users wall")
time.sleep(5)
browser.find_element_by_id('postmessagebutton2').click()

#Refresh messages
browser2.find_element_by_id('refreshmessages').click()

#Change tab and sign out
time.sleep(5)
browser2.find_element_by_id('accountbutton').click()
time.sleep(5)
browser2.find_element_by_id('signout').click()

browser.find_element_by_id('accountbutton').click()
time.sleep(5)
browser.find_element_by_id('signout').click()