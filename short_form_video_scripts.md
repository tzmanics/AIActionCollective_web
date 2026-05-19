# AIAC Short Video Scripts

-----

## FORMAT TEMPLATE

**Length:** 45–60 seconds, vertical, talking head or text overlay

**Structure:**

1. **Definition** (5–10 sec) — One plain sentence. What is this thing, full stop.
1. **Why it happens** (10 sec) — One concrete mechanical explanation. No metaphors unless they actually clarify.
1. **Two examples** (15–20 sec) — One low-stakes. One that shows real consequences.
1. **How to spot or avoid it** (10–15 sec) — Practical. Something they can do or watch for immediately.
1. **Bonus context** (5–10 sec) — A historical note, naming origin, or surprising fact that adds depth without going off-topic.
1. **References & resources (video description)** — Primary sources for any claims made in the video. Include at least one accessible resource for general audiences and, where relevant, one for the more technically curious. No aggregator blogs as primary sources — link to the original report, paper, or leaderboard.

-----

## SCRIPTS

-----

### 1. AI Hallucinations

**Definition:**
An AI hallucination is when a language model states something false with complete confidence — a made-up fact, a fake source, a person who doesn’t exist.

**Why it happens:**
By default, LLMs don’t look things up — they predict the next word based on training data, with no built-in fact-checking. Some models can search the web, but even then, the core mechanism doesn’t guarantee accuracy.

**Examples:**
*Low-stakes:* Ask ChatGPT for a book recommendation and it may give you a real author with a title that was never written.

*High-stakes:* In 2023, two New York lawyers submitted a brief citing six ChatGPT-generated court cases. None of them existed. The judge sanctioned them and ordered them to notify every judge falsely identified as the author of the bogus rulings.

**How to spot or avoid it:**
Treat any specific claim — a name, date, statistic, or source — as unverified until you check it yourself. AI is reliable for structure and language. It is not reliable for facts.

**Bonus context:**
The term comes from psychiatry, where hallucinations are perceptions with no external basis. Researchers borrowed it because the model’s output looks real and feels coherent — just like a hallucination does to the person experiencing it.

*Sources & resources:*

- *Reuters / CNBC, lawyer sanctions case (June 22, 2023) — cnbc.com/2023/06/22/judge-sanctions-lawyers-whose-ai-written-filing-contained-fake-citations.html*
- *Vectara Hallucination Leaderboard (live, general audience) — vectara.com*
- *Hugging Face Hallucination Leaderboard (live, technical) — huggingface.co/spaces/hallucination-leaderboard/leaderboard*

-----

### 2. AI Hallucinations — Data Deep Dive

> *Note: Hallucination benchmarks change frequently as models improve. Verify all figures before publishing. Use Vectara’s leaderboard (vectara.com) for current model comparisons.*

**Definition:**
An AI hallucination is when a language model states something false with complete confidence. Here’s what the research actually shows about how often it happens.

**The range:**
Hallucination rates vary enormously depending on the task and model. In open-ended questions, rates can exceed 65%. In structured summarization tasks, top models are now below 2%. Legal and medical queries consistently show higher rates than general knowledge questions — legal information hallucinates at about 6x the rate of everyday questions even in top models.

**Real-world frequency:**
Peer-reviewed research found hallucinations in roughly 31% of real-world LLM interactions — rising to 60% in complex domains like law and medicine.

**Model differences matter:**
Not all models hallucinate equally. As of late 2025, the gap between the best and worst models was significant — the least reliable model hallucinated in nearly 1 in 3 responses. The most reliable were under 1%. For current rankings, Vectara maintains a live hallucination leaderboard at vectara.com.

**The trend:**
Things are improving fast. Some models saw up to a 64% drop in hallucination rates in 2025. Retrieval-Augmented Generation — giving the model access to verified sources before it responds — cuts hallucinations by up to 71%.

**Takeaway:**
Hallucination isn’t a bug that will simply be fixed. Researchers now believe it may be an inherent property of how these models work. The goal is mitigation, not elimination — and knowing which tasks carry higher risk is half the battle.

*Sources & resources:*

- *Vectara Hallucination Leaderboard (live, general audience) — vectara.com*
- *Hugging Face Hallucination Leaderboard (live, technical) — huggingface.co/spaces/hallucination-leaderboard/leaderboard*
- *AllAboutAI hallucination statistics — allaboutai.com/resources/ai-statistics/ai-hallucinations*

-----

### 3. Automation Displacement — Definition & History

**Definition:**
Automation displacement is what happens when technology permanently eliminates the need for human labor in a job or task — not just changing how the work gets done, but removing the work from the human economy entirely.

**How it works economically:**
The pattern is consistent across every major technological shift: productivity gains go up, labor costs go down, and the people who owned the technology capture the difference. The workers who performed the displaced tasks either find new work, accept worse work, or don’t work. What happens to them is a policy choice, not an economic inevitability.

**The difference from augmentation:**
Displacement is not the same as augmentation. Augmentation is when a tool makes a worker faster or more capable — the worker remains necessary. Displacement is when the tool makes the worker unnecessary. Both are happening right now with AI, often in the same industry at the same time.

**Historical example — the sewing machine:**
This is not a new story. When the industrial sewing machine arrived in the 1850s, a single machine could do the work of six hand sewers. In one New Haven shirt factory, 1,600 women lost their jobs when the factory adopted 400 machines — and actually increased its weekly output. Production costs for garments dropped up to 90%. The productivity gains were real and enormous. But the women displaced — most of them widows with dependents — had almost no alternative employment because of the social constraints of the era. The technology didn’t determine their fate. The absence of any policy response did.

*Sources:*

- *“Many a Good Woman” — Niche Canada — niche-canada.org/2023/05/23/many-a-good-woman*
- *LSE Economic History Blog, Victorian technological unemployment — blogs.lse.ac.uk/economichistory/2022/06/01/technological-unemployment-in-victorian-britain*
- *New York Historical Society, “A Sewing Revolution” — nyhistory.org/blogs/a-sewing-revolution*

-----

### 4. Automation Displacement — Current Data

> *Note: These figures move fast. Verify before publishing. Primary sources are McKinsey Global Institute, Goldman Sachs Research, and the World Economic Forum Future of Jobs Report — check for updates before each use.*

**Definition:**
Automation displacement is when technology permanently removes human labor from a job or task. Here’s what the research says about the scale of what’s happening right now.

**The scope:**
McKinsey estimates that today’s AI — not future versions, what exists right now — could automate approximately 57% of current U.S. work hours. That’s not 57% of jobs eliminated; it means more than half of the hours worked involve tasks a sufficiently deployed AI could handle today. Goldman Sachs puts 300 million full-time jobs globally at exposure to AI automation.

**Who’s feeling it first:**
The impact is not evenly distributed. Administrative and office support has 46% of its tasks automatable. Customer service: 41%. Data processing: 38%. The roles with the least near-term exposure are those requiring physical presence and complex judgment — healthcare, construction, emergency services. And the workers hit hardest right now are young: software developers aged 22–25 have already seen nearly a 20% drop in employment since 2022.

**The “net positive” problem:**
The World Economic Forum projects 92 million jobs displaced by 2030 but 170 million new roles created — a net gain of 78 million on paper. The problem is the timing mismatch: displaced workers often don’t have the skills for the jobs being created, and retraining takes time and resources most workers don’t have access to. A net positive in aggregate is not a net positive for the person who lost their job this year.

**The honest range:**
Estimates vary widely depending on what’s being measured. Goldman Sachs’ own site notes that if only current AI use cases expanded — not new ones — just 2.5% of U.S. jobs face near-term displacement risk. Their broader scenario modeling ranges from 3% to 14%. The difference between those numbers is almost entirely a policy question.

*Sources:*

- *Goldman Sachs AI Workforce Analysis (2025) — goldmansachs.com/insights/articles/how-will-ai-affect-the-global-workforce*
- *McKinsey Global Institute (2025) — mckinsey.com*
- *World Economic Forum Future of Jobs Report 2025 — weforum.org*
- *DesignRush AI Job Displacement Statistics (2026) — designrush.com/agency/ai-companies/trends/ai-job-displacement-statistics*

-----
