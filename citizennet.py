import requests
from time import sleep

RETRY_TIMER = 2         # retry timer in seconds
MAX_RETRIES = 5         # max number of retries before stopping task


class Task():
    name = None
    task = None
    done = False
    retries = 0

    def __init__(self, name, task):
        self.name = name
        self.task = task


def likes():
    API_URL = "http://rack1.citizennet.com/interviewtest/api?file=likes.json&access_token=AAAAAL2uajO8BAPcqOwZB6"
    print "likes"
    return True


def posts():
    API_URL = "http://rack1.citizennet.com/interviewtest/api?file=posts.json&access_token=AAAAAL2uajO8BAPcqOwZB6"
    print "posts"
    return True


if __name__ == "__main__":
    # Place jobs into the jobs list
    jobs = []
    jobs.append(Task(name="Likes Job", task=likes))
    jobs.append(Task(name="Posts Job", task=posts))

    print "Starting CitizenNet API program..."
    while True:
        print "There are %s jobs in the queue" % len(jobs)
        # All failed jobs will be added to failed_jobs
        failed_jobs = []
        while len(jobs) > 0:
            job = jobs.pop(0)
            print "[EXECUTING] job name: %s" % job.name
            result = job.task()
            job.retries += 1
            if result:
                # The task was successful
                job.done = True
            else:
                # The task failed
                failed_jobs.append(job)
        if len(failed_jobs) > 0:
            for job in failed_jobs:
                # Check if we've reached the max number of retries
                if job.retries < MAX_RETRIES:
                    jobs.append(job)
                else:
                    print "[WARNING]: %s reached the max number of retries(%s) and will be stopped." % (job.name, MAX_RETRIES)
        if len(jobs) > 0:
            print "[PAUSING] for %s seconds before retrying failed jobs" % RETRY_TIMER
            sleep(RETRY_TIMER)
        else:
            break
