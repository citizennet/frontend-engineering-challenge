import requests
from time import sleep


# Settings
RETRY_TIMER = 1         # number of seconds to wait in between retries
MAX_RETRIES = 5         # max number of retries before stopping task


class Task():
    name = None
    task = None
    done = False
    retries = 0

    def __init__(self, name, task):
        self.name = name
        self.task = task


# Returns True if task was successfully completed (based on HTTP status code)
# Returns False if task failed.
def likes():
    API_URL = "http://rack1.citizennet.com/interviewtest/api?file=likes.json&access_token=AAAAAL2uajO8BAPcqOwZB6"
    response = requests.get(API_URL)

    # If HTTP status code is 200, assume our request was successful
    if response.status_code == 200:
        result = response.json()
        writer = open("likes.html", "w")

        html_start = """<!DOCTYPE html>
<html>
    <head>
        <title>CitizenNet Likes</title>
    </head>
    <body>
        <h1>CitizenNet Likes</h1>
        """

        html_end = """
    </body>
</html>"""

        html_content = ""
        for item in result["data"]:
            name = item["name"]
            id = item["id"]
            category = item["category"]

            html_content += """
        <div>
            <h2>%s</h2>
            <p>%s<br>
            %s</p>
        </div>
            """ % (name, id, category)
        html_final = html_start + html_content + html_end
        writer.write(html_final)
        return True

    # Our request failed
    else:
        return False


# Returns True if task was successfully completed, (based on HTTP status code)
# Returns False if task failed.
def posts():
    API_URL = "http://rack1.citizennet.com/interviewtest/api?file=posts.json&access_token=AAAAAL2uajO8BAPcqOwZB6"
    response = requests.get(API_URL)
    if response.status_code == 200:
        result = response.json()
        writer = open("posts.html", "w")

        html_start = """<!DOCTYPE html>
<html>
    <head>
        <title>CitizenNet Posts</title>
    </head>
    <body>
        <h1>CitizenNet Posts</h1>
        """

        html_end = """
    </body>
</html>"""

        html_content = ""
        for item in result["data"]:
            name = item["from"]["name"]
            try:
                message = item["message"]
            except:
                message = ""

            html_content += """
        <div>
            <h2>%s</h2>
            <p>%s</p>
        </div>
            """ % (name, message)
        html_final = html_start + html_content + html_end
        writer.write(html_final)
        return True
    else:
        return False


# The main program
if __name__ == "__main__":
    # Place jobs into the jobs list
    jobs = []
    jobs.append(Task(name="Likes", task=likes))
    jobs.append(Task(name="Posts", task=posts))

    print "Starting CitizenNet API program..."
    while True:
        print "\nThere are %s jobs in the queue" % len(jobs)
        # All failed jobs will be added to failed_jobs
        failed_jobs = []
        while len(jobs) > 0:
            job = jobs.pop(0)
            print "[EXECUTING] Job name: %s" % job.name
            result = job.task()
            job.retries += 1
            if result:
                # The task was successful
                print "[SUCCESS]   Job completed successfully."
                job.done = True
            else:
                # The task failed, add task to failed_jobs list
                print "[FAILURE]   Job failed."
                failed_jobs.append(job)
        if len(failed_jobs) > 0:
            for job in failed_jobs:
                # Check if we've reached the max number of retries
                if job.retries < MAX_RETRIES:
                    jobs.append(job)
                else:
                    print "[WARNING]   %s reached the max number of retries (%s) and will be stopped." % (job.name, MAX_RETRIES)

        if len(jobs) > 0:
            print "[PAUSING]   for %s seconds before retrying failed jobs" % RETRY_TIMER
            sleep(RETRY_TIMER)
        else:
            break
