import urllib2
import urllib
import json
from datetime import date

'''
Set the below variables as per requirements
'''
FACEBOOK_APP_ID = "176302575823725"
FACEBOOK_APP_SECRET = "f67f3d86a4d1e0660cfcfd575bc93dfe"
like_dump ="likedump " +  str(date.today()) +".txt"
post_dump ="postdump" +  str(date.today())+".txt"
client_ID = "citizennet"


class FBAPIError(Exception):
    def __init__(self, type, message):
        Exception.__init__(self, message)
        self.type = type



class FBGraph():
  ''' The API that uses facebook API's to obtain likes & posts
		'''
	
	def __init__ (self, access_token=None):
		self.access_token = access_token
	
	def get_access_token(self, application_id=FACEBOOK_APP_ID,application_secret=FACEBOOK_APP_SECRET):
		'''
		Defaults to access token given for out FACEBOOK_APP_ID and Facebook Secret Key,
		Can also handle other application ids & keys
		'''
		args = {
			'client_id' : application_id , \
			'client_secret' : application_secret, \
			'grant_type':'client_credentials'
		}
		
		
		try :
			req_response = urllib.urlopen("https://graph.facebook.com/oauth/access_token?" + urllib.urlencode(args) )
		
			if req_response :
				access_token = req_response.read().split("=")[1]
				self.access_token = access_token
				req_response.close()
				
		except Exception, e:
			raise e
			
			
		return access_token
		
	def get_requests(self,id=None,type="posts"):
		'''
		This functions default behaviour is to obtain the posts data for the app creater,
		We can pass in other ids ( users) to obtain post and like information
		type : indicates type of data to be searched ( posts or likes ) can also be extended to other parameters	
		'''
		if not id : 
			id ="me"
			self.access_token = self.get_access_token()	
		if not self.access_token :
			self.access_token = self.get_access_token()
			
		new_args = {}
		new_args["fields"] = type
		new_args["access_token"] = self.access_token
		new_args["format"] ="json-string"
		
		#print new_args	
		req_response = urllib.urlopen("https://graph.facebook.com/" +	id +'?'+ urllib.urlencode(new_args))
			
		try :	
			user_data = json.loads(req_response.read())
			#print user_data.keys()
					 
			if user_data and user_data.get("error"):
				raise FBAPIError(user_data["error"]["type"],
                                user_data["error"]["message"])
		finally:
			if req_response :
				req_response.close()			
		
		
		if user_data.has_key(type):
			return user_data[type]
		else:
			return
		
		
	def get_all_post_likes(self,id=None,mode="Fast"):
		'''
		This is an additional functionality to obtain all the likes data for all the posts,
		It has 2 operating modes, 
			1. Fast mode which parses all the posts, to obtain likes data from them
			2. Other mode which makes separate like query for each post (illustrates multifunctionality of get_requests)
		'''
		if not id : id ="me"
		req_response = self.get_requests(id)
		if req_response:
			posts = req_response["data"]
			if posts:
				likes = [{} for i in range( len(posts))] 
				print len(posts)
				for post in range(len(posts)):
					likes[post]["id"] = posts[post]["id"]
					if(posts[post].has_key("likes")):
						if mode =="Fast":
							likes[post]["data"] = posts[post]["likes"]
						else:
							likes[post]["data"] = self.get_requests(posts[post]["id"],type="likes")
				
				return likes	
		else:
			return

		
''' Sample API Usage to  
	Obtain accesstoken and dump posts & likes to respective files 
	'''		
MyObj = FBGraph()
access_token = MyObj.get_access_token()

with open(post_dump,"w") as f1 : 
	json.dump(MyObj.get_requests(id=client_ID ),f1,sort_keys=True,indent=4, separators=(',', ': '))
	f1.close()
	
with open(like_dump,"w") as f2 : 
	json.dump(MyObj.get_all_post_likes(id=client_ID ),f2,sort_keys=True,indent=4, separators=(',', ': '))
	f2.close()	
	
