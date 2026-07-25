---
title: ZJUT Major Transfer (Computer Science) Experience Sharing | A Guide(?
description: Class of 24, transferred in the second semester of freshman year. No grade drop. Wrote this little piece for my juniors since I researched this a lot over the past year.
published: 2025-06-04
draft: false
tags: [campus]
image: /source-of-blog/blog-4%20zzy/komiji.jpg
---
# This Passage is translated by AI from zh version
If you are reading this blog right after stepping onto campus, I highly recommend you come back and read it again later.

Because my main purpose for writing this post is to help you build your whole freshman year plan with "transferring majors" as a core theme.

It would be awesome if this helps you out.

# My Situation
First of all, I transferred to `Computer Science (Software Engineering)`.
If you are transferring to other categories, you can still use the non-coding-exam parts as a solid reference.

My original major was Chemical Engineering. During my first semester, I considered participating in the ACM contest and had been doing some front-end development on the side. Since I had a decent amount of coding experience, I barely passed the coding exam without much specific preparation.

As for the interview, I did have some front-end projects, but I felt the most crucial factor was my `Regional 3rd Prize in the China Collegiate Computing Competition (Service Outsourcing)`.

However, even with my background, passing wasn't a breeze (mainly because I got roasted for only solving 3 out of 5 problems in the coding exam).
Even if you are an ACM guy, you still need to pay attention to the coding exam (we actually had an ACMer who failed the exam this year).

So, if you want to transfer majors, don't procrastinate! You have to start planning the moment you enter college. Otherwise, you might easily face a grade demotion (having to repeat a year) or just fail outright.

# Timeline / Difficulty Description
- You have three chances: Freshman Spring, Sophomore Fall, and Sophomore Spring.
- I'll generally assume you, my reader, are doing it in Freshman Spring.

`Freshman Fall: Grind your GPA, meet specific course grade requirements → Freshman Spring: Self-add courses (Minor) → Transfer Exam: (Coding Exam → Interview)`

I've seen people fail at every single step. Read carefully.
The difficulty varies from person to person. If your academic performance is great, your GPA won't be an issue. On the flip side, I've seen guys get kicked out immediately just because their Advanced Math score didn't reach 70.

Let me describe the difficulty of the coding exam and interview using passing rates.
The numbers are approximate, maybe off by 1 or 2 people.

- `(Class of 25) SE takes 20, CS takes 18, Cyber Security takes 6.`
- `Coding Exam: 130 → 34.`
- `First Choice Interview: 34 → SE 12, CS 13 (Total 25), Network Eng 2, Digital Media 5.`

Note that the interview numbers are just for the first round, and neither reached their max recruitment quota! So transferring majors is more about meeting the standard than just competing with others.
Here is a picture (a list of people who passed their first choice in the Class of 24) (it's public on the official website anyway).
As you can see, the grade demotion rate is still quite high.
![alt text](/source-of-blog/blog-4%20zzy/9aa0b3b49ea34e89c4f99487bc0ac0b.jpg)

# Materials to Find & Info to Notice
1. **Transfer Standards and Details**
Look for your year's `Major Transfer Standards` and something like `ZJUT 2024 Undergraduate Major Transfer Implementation Details Summary`.
2. **The Curriculum of Your Target Major**
First, you need this to figure out what courses you need to catch up on and what you don't need to take.
Second, interviewers might ask you: "Have you read our curriculum? What classes on it do you like?"
3. **Admission Quota**
Check how many people CS or SE will recruit in your year.
In my year, CS took 18, SE 20, and the others combined took about 13. This helps you fill out your preference form.
4. **Application Timeline**
Normally, exams start in the `12th week` of the semester. So, `once the 12th week approaches`, keep a close eye on when applications open (don't forget to apply for it, lol).

# Preparations on Your Abilities
1. **Taking courses in advance independently**

If you don't take CS courses in advance and miss too many core classes, you will get a grade demotion (usually missing 4 means demotion; I missed 3, so I barely stayed in my grade).

It's highly unlikely you can manually adjust your schedule in Freshman Fall. If you have the tricks to get the academic office to add classes for you early, you are a god.
The better way is to apply for a `Minor Course` at the end of Fall when choosing Spring courses (apply early, they get full quickly). I minored in C++.

Then, in Freshman Spring, you can try to drop non-CS professional courses (for example, I dropped Engineering Drawing). Methods:
- Secretly don't select the course during course selection (this worked for me). Your academic office probably won't notice, or they might just be too lazy to care.
- If it's already selected, try begging the academic office to drop it (very hard to succeed).

2. **GPA / Specific Course Standards**

Class of 24 Requirements:
- College Physics 70 (if applicable)
- Math courses (like Adv. Math) 70 `(Needs the hardest studying)`
- College English 70 `(Needs the most praying)`
- Programming (like Python, C) 70 `(The easiest)`

Be super careful with Math and College English! Grab all the usual performance points you can get, otherwise, waiting for the final scores to come out will be pure torture (personal experience).

As for GPA, mine was a bit over 3.0. Generally speaking, staying above 3.0 is totally fine. Having a higher GPA just means the interviewers might praise you a bit. You can grind it or not, but it should at least be around 3.0. Too low just looks bad.

3. **Coding Exam**
- 5 problems in total. You must solve 3 to pass.
- This is the biggest filter and where the main difficulty lies.

**Programming Language**:
Only C/C++ is allowed!
Zhejiang students who took IT in Gaokao, stop yelling about how much you love Python. Just honestly learn C++.
Practice using `Dev-C++`, because it's the only guaranteed IDE on the exam computers.
For you `VSCode` lovers, you are in for a treat —— force yourself to practice hard on Dev-C++.

For the coding exam, I highly recommend using C++ with the `<bits/stdc++.h>` library. It's so smooth.
I won't teach C++ basics here; figure it out yourself. You don't even need to learn pointers or classes, as long as you can solve algorithmic problems.

**Practice**:
The exam OJ (Online Judge): [http://acm.zjut.edu.cn/onlinejudge/] *(Campus network required)*
There are lots of basic clearance test problems here. But the transfer exam is harder than those. Train until you can **stably AC (Accept) a clearance test set within 40 minutes**.
Also, get familiar with this OJ's quirks, like being strict on trailing spaces but lenient on trailing newlines.
Know what Presentation Error, WA (Wrong Answer), and Runtime Error mean in the logs.

There are also past exam questions. I recorded the ones I took this time, but I won't post them publicly since the school forbids leaking them (so if you DM me privately, I might tell you roughly how they looked, cough cough).

4. **Competitions / Projects**

I mentioned several projects during the interview, but the teachers didn't seem to care much. I guess projects have limited impact.

Competitions are highly recommended, even if it's just for participation. When you mention a contest during the interview, the teachers will acknowledge your interest in CS, which is a huge plus.

**Recommended Contests**:
Only CS-related ones are recommended. Others might not be useful.
- **Our school's ACM Freshman Contest / ACM School Contest** are highly recognized and act as a perfect exam simulation (getting used to the environment; the actual transfer exam is definitely easier).
- Other school-level CS contests (like `HanRuan`), see if you can grab an easy award.
- Highly recognized national CS-related contests (like the `China Collegiate Computing Competition`). These are hard to get, but winning one helps tremendously.

# Filling Out Preferences
Normally, you just choose between `Computer Science and Technology (CS)` and `Software Engineering (SE)`.

I'm not familiar with the others, so I won't discuss them here. Besides CS and SE, the other branches take up a very small percentage.

**First Choice / Second Choice Mechanism**:
The specific mechanism depends on your year's rules (for example, a few years before me, `you could take the coding exam twice`). But I feel like future rules will at most be as harsh as mine.

In my year, there was only one coding exam. First choice and second choice just meant two separate interviews.
This means about a week after passing the coding exam, you take the first choice interview.
The day after that interview, the passing list is usually published. If you failed, you then participate in the second choice interview.

**Differences Between Branches**:
CS is definitely the ace major, followed by SE. For the others, if you apply for non-matching jobs later (like a Cyber Security major applying for front-end dev), your resume might look a bit awkward.
CS courses are harder; for example, you have to study circuits and stuff.
SE is relatively easier.

Also, if you want postgraduate recommendation (Baoyan), choosing SE is definitely easier. The internal competition (like raising Gu bugs) in CS is fierce.

# My Coding Exam + Interview Experience
## Coding Exam
- **90 mins**, **5 problems**, solve **3 or more** to pass and enter the interview stage.
- They only look at the number of solved problems, no time penalties.

For past data, you can check the contest section on [http://acm.zjut.edu.cn/onlinejudge/]. The leaderboards for past transfer exams are public.

In Freshman Spring for the Class of 24 (my time), 18 people solved 3 problems, and 16 people solved 4~5 problems.

Here is how my exam went:

> 10 min: Set up the computer (used Dev-C++), passed Q1.
> 20+ min: Stuck on Q2 (trapped by a detail: the problem asked me to output two numbers per line. I just printed them, but after the exam, I realized I needed to compare them and swap their order).
> 40 min: Solved Q3, didn't fall into any detail traps.
> 55 min: Finished coding Q4, but got stuck because I forgot 0 and 1 are not prime numbers.
> 55~77 min: The most stressful 20 minutes of my life. Kept searching for where I was stuck in Q2 and Q4.
> 77 min: Found the detail error in Q4 and solved it.

The last 30 minutes were incredibly tense. Honestly, it felt like I only had 60 minutes of effective problem-solving time (my skills weren't enough, sigh).
If your C++ is decent, you'll mainly be battling detail issues. The overall difficulty is around `Luogu Beginner ~ Normal-`, but they will intentionally set traps in the details.

## Interview
My rules this time:
- Lasts **5 mins**, they won't intentionally make things hard for you. Includes self-intro + Q&A.
- The interviewee stands on the podium. Teachers sit in the first two rows.
- One main interviewer keeps asking you questions, while the others discuss like they are in a wet market.

**Questions:**
Most questions are based on what you said in your `Self-intro`.
1. Self-intro
> Figure this out yourself. I just talked about my projects and contest experiences.
2. What have you learned on your own?
> Me: Front-end development. (But I felt those teachers didn't understand it; they just listened and stayed quiet).
3. How many missing courses do you have?
> Me: Currently missing three (Discrete Math, C Programming, Linear Algebra). I can easily pass C Programming (self-taught), and I minored in C++.
> *(If they ask this, you basically passed. They are just evaluating whether you need a grade demotion. If you miss 4+ courses here, get ready to be demoted).*
4. Have you read our curriculum? Are there any classes you particularly like?
> Me: Web dev, Java, Computer Networks, etc.
5. Why transfer to SE instead of CS?
> Me: CS requires studying circuits and stuff, which is too hard for me. (Actually, I was just too lazy to spend that much time studying).

Afterward, the teachers discussed whether to demote me for a while. But I was super lucky during my interview:
The teacher who taught my C++ minor class happened to be one of the interviewers! He spoke up for me down there, saying he didn't want me to get demoted.

So, moral of the story: do NOT offend any CS college teachers during your freshman year. For example, if you sleep in a teacher's class, and they end up interviewing you... you can basically pack your bags (tears).