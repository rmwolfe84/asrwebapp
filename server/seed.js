const mongoose = require('mongoose');
const connectDB = require('./db');
const BlogPost = require('./models/BlogPost');

// Load environment variables
require('dotenv').config();

// Connect to database
connectDB();

// Sample blog posts
const samplePosts = [
  {
    title: 'Signs Your Roof Needs Replacement',
    content: `
# Signs Your Roof Needs Replacement

Your roof is one of the most critical components of your home, providing protection against the elements and contributing significantly to your property's overall structural integrity. However, like all parts of your home, roofs have a limited lifespan and will eventually need replacement.

## 1. Age of Your Roof

Most asphalt shingle roofs last between 20-25 years. If your roof is approaching this age range or has exceeded it, it's wise to consider a replacement, even if it appears to be in decent condition.

## 2. Curling or Buckling Shingles

When shingles begin to curl at the edges or buckle in the middle, it's a clear indication that they're past their prime. This deterioration exposes your roof to water damage and leaks.

## 3. Missing Shingles or Granules

Finding shingle granules in your gutters or noticing bald spots on your shingles indicates advanced wear. Similarly, missing shingles create vulnerable areas where water can penetrate.

## 4. Sagging Roof Deck

A sagging roof deck suggests potential structural issues that require immediate attention. This could indicate water damage, rotting boards, or structural problems.

## 5. Daylight Through Roof Boards

If you can see daylight coming through your roof boards in your attic, it's a serious warning sign. Where light can enter, so can rain, cold air, and snow.

Don't wait until water is dripping into your living room before addressing roof issues. Regular inspections and proactive maintenance can save you thousands in potential damage repair costs. Contact All Square Roofing today for a comprehensive roof assessment and expert advice on whether repair or replacement is your best option.
    `,
    prompt: 'Write a blog post about signs that indicate a roof needs replacement',
    status: 'approved',
    publishDate: new Date('2024-04-01T12:00:00Z'),
    createdAt: new Date('2024-03-25T10:30:00Z'),
    updatedAt: new Date('2024-03-25T10:30:00Z')
  },
  {
    title: 'Choosing the Right Roofing Material for Your Home',
    content: `
# Choosing the Right Roofing Material for Your Home

Selecting the right roofing material for your home is a significant decision that impacts not only the appearance of your property but also its protection, energy efficiency, and long-term maintenance costs. With numerous options available on the market, how do you determine which is best suited for your specific situation?

## Asphalt Shingles
**Pros:** Affordable, easy to install, available in various colors
**Cons:** Shorter lifespan (15-30 years), less environmentally friendly
**Best for:** Budget-conscious homeowners, most climate conditions

## Metal Roofing
**Pros:** Extremely durable (50+ years), energy efficient, fire-resistant
**Cons:** Higher initial cost, can be noisy during rain/hail
**Best for:** Long-term investments, harsh weather areas, modern designs

## Clay or Concrete Tiles
**Pros:** Visually striking, very long-lasting (50+ years), excellent insulation
**Cons:** Heavy (may require structural reinforcement), expensive
**Best for:** Mediterranean, Spanish, or southwestern style homes

## Slate Roofing
**Pros:** Natural beauty, fire-resistant, potentially 100+ year lifespan
**Cons:** Very expensive, heavy, requires specialized installation
**Best for:** High-end homes, historic restorations

## Wood Shakes/Shingles
**Pros:** Natural appearance, good insulation
**Cons:** High maintenance, lower fire resistance (unless treated)
**Best for:** Rustic designs, temperate climates

## Factors to Consider When Choosing:

1. **Local Climate:** Consider temperature extremes, precipitation, wind conditions, and sun exposure
2. **Roof Pitch:** Some materials work better on steeper slopes
3. **Budget:** Both initial costs and long-term value
4. **HOA Restrictions:** Many neighborhoods have guidelines about acceptable roofing materials
5. **Environmental Concerns:** Energy efficiency, recyclability, and sustainability

At All Square Roofing, our experts can guide you through this important decision-making process, helping you balance aesthetics, performance, and budget to find the perfect roofing solution for your home.
    `,
    prompt: 'Write a blog post about how to choose the right roofing material for different types of homes',
    status: 'approved',
    publishDate: new Date('2024-04-10T14:00:00Z'),
    createdAt: new Date('2024-04-05T09:15:00Z'),
    updatedAt: new Date('2024-04-05T09:15:00Z')
  },
  {
    title: 'How to Prepare Your Roof for Extreme Weather',
    content: `
# How to Prepare Your Roof for Extreme Weather

Extreme weather events are becoming increasingly common, posing significant threats to homes and properties. Your roof serves as your home's first line of defense against these elements, making proper preparation essential for minimizing damage and ensuring your family's safety.

## Understanding the Risks

Different weather events pose distinct challenges to your roof:

- **High Winds:** Can lift and remove shingles, especially if they're already loose
- **Heavy Rain:** Tests your roof's waterproofing and drainage systems
- **Hail:** May cause impact damage, creating weak points for future leaks
- **Snow and Ice:** Add substantial weight and can create ice dams that lead to water intrusion

## Preventative Measures

### 1. Schedule Professional Inspection

Before storm season hits, have a professional roofer inspect your entire roofing system. They'll identify potential weak points that might fail during extreme conditions.

### 2. Secure or Replace Loose Shingles

Loose or damaged shingles are particularly vulnerable during high winds. Having these repaired or replaced promptly can prevent more extensive damage.

### 3. Clean Gutters and Downspouts

Clogged drainage systems prevent water from properly flowing away from your home, increasing the risk of water damage. Ensure gutters are securely attached to withstand heavy rain and winds.

### 4. Trim Overhanging Branches

Trees near your home can cause significant damage during storms. Remove dead branches and trim those hanging over your roof to minimize this risk.

### 5. Reinforce Weak Areas

Have a professional reinforce areas particularly vulnerable to wind damage, such as eaves and roof edges.

### 6. Check Attic Ventilation and Insulation

Proper ventilation and insulation help maintain consistent roof temperatures, preventing ice dam formation during winter and reducing heat-related damage in summer.

## After the Storm

Following any significant weather event:

1. Safely inspect your property for obvious signs of damage (from the ground)
2. Document any visible damage with photos for insurance purposes
3. Contact a professional roofer for a thorough inspection
4. Address any damage promptly to prevent it from worsening

Being proactive about roof maintenance and preparation can significantly reduce the risk of catastrophic damage during extreme weather. At All Square Roofing, we're committed to helping homeowners protect their most valuable asset through all seasons.
    `,
    prompt: 'Write a blog post about preparing your roof for extreme weather conditions',
    status: 'approved',
    publishDate: new Date('2024-04-15T10:00:00Z'),
    createdAt: new Date('2024-04-08T13:45:00Z'),
    updatedAt: new Date('2024-04-08T13:45:00Z')
  },
  {
    title: 'The Environmental Benefits of Cool Roofing',
    content: `
# The Environmental Benefits of Cool Roofing

As climate concerns grow and energy costs rise, homeowners are increasingly looking for sustainable building solutions. Cool roofing technology represents one of the most effective ways to reduce both environmental impact and utility bills.

## What Is a Cool Roof?

A cool roof is designed to reflect more sunlight and absorb less heat than a standard roof. While traditional dark roofs can reach temperatures of 150°F or more during summer heat, cool roofs might stay more than 50°F cooler under the same conditions.

## Environmental Benefits

### 1. Reduced Urban Heat Island Effect

Urban areas typically experience higher temperatures than surrounding rural areas due to the concentration of buildings, roads, and other structures that absorb and retain heat. Cool roofs help mitigate this "heat island effect," potentially lowering city temperatures and improving air quality.

### 2. Decreased Energy Consumption

Buildings with cool roofs require less energy for air conditioning, which translates to:

- Reduced power plant emissions
- Lower peak electricity demand
- Decreased strain on the power grid during extreme heat events

### 3. Extended Roof Lifespan

By reducing temperature fluctuations and UV exposure, cool roofs often last longer than conventional roofing, reducing the environmental impact associated with manufacturing and disposing of roofing materials.

### 4. Improved Air Quality

Lower temperatures lead to reduced formation of ground-level ozone (smog), a significant air pollutant in urban environments.

## Options for Homeowners

Several cool roofing options are available:

- **Cool roof coatings:** Can be applied to existing roofs
- **Reflective shingles or tiles:** Available in various styles and colors
- **Metal roofing:** Naturally reflective and can be enhanced with special finishes
- **Green roofs:** Planted roofs that provide additional environmental benefits

## Is Cool Roofing Right for You?

While cool roofing offers clear benefits in warm climates, the decision may be more complex in regions with cold winters. In some northern areas, the winter heating penalty might offset summer cooling savings.

At All Square Roofing, we can help you evaluate whether cool roofing makes sense for your specific situation, considering your local climate, building design, and energy usage patterns. Contact us today to learn more about environmentally friendly roofing options that could benefit both your home and the planet.
    `,
    prompt: 'Write about cool roofing technology and its environmental benefits',
    status: 'pending',
    publishDate: null,
    createdAt: new Date('2024-04-18T11:20:00Z'),
    updatedAt: new Date('2024-04-18T11:20:00Z')
  },
  {
    title: 'DIY Roof Maintenance Tips for Homeowners',
    content: `
# DIY Roof Maintenance Tips for Homeowners

While professional roof inspections are essential, there are many maintenance tasks homeowners can safely perform themselves to extend their roof's lifespan and prevent costly repairs. Regular DIY maintenance not only saves money but also helps you spot potential issues before they become serious problems.

## Safety First

Before attempting any roof maintenance:

- Never work on the roof during wet, windy, or icy conditions
- Wear non-slip footwear
- Use a properly secured ladder with a stabilizer
- Consider using a safety harness if working on steep pitches
- Work with a partner who can spot you from the ground
- Stay clear of power lines

If you're uncomfortable with heights or uncertain about any aspect of roof maintenance, contact a professional rather than risking injury.

## Seasonal Maintenance Checklist

### Spring

1. **Clear debris:** Remove branches, leaves, and other debris that accumulated over winter
2. **Clean gutters and downspouts:** Ensure proper drainage as spring rains arrive
3. **Check for winter damage:** Look for missing or damaged shingles from winter storms
4. **Inspect flashing:** Verify all flashing around chimneys, vents, and skylights is secure

### Summer

1. **Look for moss or algae growth:** These can retain moisture and damage roofing materials
2. **Trim overhanging branches:** Prevent damage from falling branches and reduce debris
3. **Check attic ventilation:** Proper ventilation prevents heat buildup that can damage shingles

### Fall

1. **Clean gutters thoroughly:** Remove fallen leaves to prevent clogging
2. **Check for animal activity:** Look for signs of birds, squirrels, or other creatures attempting to nest
3. **Inspect roof valleys:** Ensure they're clear of debris to prevent water pooling

### Winter

1. **Look for ice dams:** Address any ice buildup at roof edges
2. **Monitor snow load:** Remove excessive snow accumulation if safe to do so (or hire professionals)
3. **Check for leaks:** Inspect your attic after storms for signs of water intrusion

## Simple DIY Repairs

While major repairs should be left to professionals, homeowners can often handle:

- **Replacing individual shingles:** For minor wind damage
- **Resealing exposed nail heads:** To prevent leaks
- **Applying moss killer:** To prevent growth and spread
- **Reapplying caulk:** Around flashing and vents where old caulk has deteriorated

## When to Call the Professionals

Some situations require expert attention:

- Multiple missing or damaged shingles
- Sagging areas on the roof
- Interior water stains
- Significant granule loss from asphalt shingles
- Any structural concerns

Regular DIY maintenance combined with professional inspections every 2-3 years is the ideal approach for maximizing your roof's lifespan while minimizing costs. At All Square Roofing, we're always available to handle the tasks beyond DIY capacity and to provide guidance on proper maintenance techniques.
    `,
    prompt: 'Write about DIY roof maintenance tips that homeowners can safely perform',
    status: 'pending',
    publishDate: null,
    createdAt: new Date('2024-04-20T14:10:00Z'),
    updatedAt: new Date('2024-04-20T14:10:00Z')
  }
];

// Function to seed the database
async function seedDatabase() {
  try {
    // Clear existing blog posts
    await BlogPost.deleteMany({});
    console.log('Cleared existing blog posts');

    // Insert sample posts
    const result = await BlogPost.insertMany(samplePosts);
    console.log(`Successfully seeded ${result.length} blog posts`);

    // Display summary
    console.log('\nSeed data summary:');
    console.log(`Published posts: ${result.filter(post => post.status === 'approved').length}`);
    console.log(`Pending posts: ${result.filter(post => post.status === 'pending').length}`);
    
    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();