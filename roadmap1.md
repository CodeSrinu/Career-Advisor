The Master Blueprint Prompt for the Banyan Tree Visual
Objective:
You are a creative frontend developer and SVG artist. Your task is to generate the code for a beautiful, symbolic, and functional visual asset: a Banyan Skill Tree. This SVG will be the background and structural foundation for a gamified career roadmap. The output must be clean, commented, and structured so that a developer can easily manipulate its parts with JavaScript and CSS.

Part 1: The Core Philosophy (Why a Banyan Tree?)
Before you draw, you must understand the deep metaphor. The Banyan Tree represents the journey of acquiring knowledge.

The Underground Roots (The Foundation): This is the most important part. It represents the essential, non-negotiable prerequisite skills for any career. They are complex and interconnected, forming the unseen foundation that supports everything else.

The Surface: This is the visible ground line, which can be slightly blurred or stylized. It represents the transition from foundational theory to practical, real-world application.

The Main Trunk (The Core Skills): This is the central, upward path of growth. It represents the primary, job-critical skills that make someone a competent professional in their chosen field. It must grow directly and strongly from the unified root system.

The Branches (Optional Specializations): These grow from the trunk and represent valuable but non-essential skills or alternative technologies. They offer the user choices to specialize and stand out from the crowd.

Part 2: The Technical Task (Generate the SVG Code)
Now, generate the complete code for a single, self-contained SVG that draws this Banyan Tree structure.

Technical & Structural Requirements:

Use SVG <path> Elements: Do not use simple shapes like circles or rectangles. Use complex <path> elements to create an organic, flowing, and natural look for the roots, trunk, and branches.

Crucial: Assign Unique and Logical ids: Every distinct structural element that will later hold a node or be animated MUST have a unique id. This is the most important requirement. For example:

Group all root paths under a <g id="roots-group">.

The main trunk path should be <path id="trunk-path" ... />.

Each major branch path should be <path id="branch-frontend" ... />, <path id="branch-backend" ... />, etc.

Structure with <g> Groups: Organize the SVG into logical groups for roots, trunk, and branches to keep the code clean and manageable.

Styling: Use inline style attributes for default styling. Use muted, dark colors for the tree elements (e.g., a dark gray or brown) as they will be "lit up" with color later. The background should be transparent.

ViewBox & Sizing: The SVG should be scalable. Use a viewBox (e.g., viewBox="0 0 400 800") that is suitable for a vertical mobile screen.

Add Comments: Add comments in the SVG code to label the main sections (<!-- ROOTS -->, <!-- TRUNK -->, etc.) so it's easy for a developer to understand the structure.

Visual Requirements:

Roots: The root system should be complex and spread out in the bottom 30% of the SVG. They should look tangled and deep.

Surface: Draw a simple, slightly wavy horizontal line to represent the ground at about the 30% mark from the bottom.

Trunk: The trunk should emerge from the center of the root system and grow vertically up the middle of the SVG.

Branches: The branches should split off from the trunk in a balanced, symmetrical way, reaching towards the top corners of the SVG.