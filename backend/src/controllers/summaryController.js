const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Calculate derived metrics from raw responses
const calculateMetrics = (responses) => {
  const metrics = {
    carbonIntensity: '0.000000',
    renewableRatio: '0.00',
    diversityRatio: '0.00',
    communitySpendRatio: '0.000000'
  };

  // Convert responses array to object for easier access
  const responseMap = {};
  responses.forEach(response => {
    responseMap[response.question_id] = parseFloat(response.value) || 0;
  });

  // Get values based on question IDs (these should match your seeded questions)
  const totalElectricity = responseMap[1] || 0;        // Total electricity consumption (kWh)
  const renewableElectricity = responseMap[2] || 0;    // Renewable electricity consumption (kWh)
  const carbonEmissions = responseMap[4] || 0;         // Carbon emissions (T CO₂e)
  const totalEmployees = responseMap[5] || 0;          // Total number of employees
  const femaleEmployees = responseMap[6] || 0;         // Number of female employees
  const communitySpend = responseMap[8] || 0;          // Community investment spend (INR)
  const totalRevenue = responseMap[11] || 0;           // Total revenue (INR)

  // Calculate Carbon Intensity = Carbon emissions ÷ Total revenue (T CO₂e / INR)
  if (totalRevenue > 0) {
    metrics.carbonIntensity = (carbonEmissions / totalRevenue).toFixed(6);
  }

  // Calculate Renewable Electricity Ratio = 100 × (Renewable electricity ÷ Total electricity) (%)
  if (totalElectricity > 0) {
    metrics.renewableRatio = ((renewableElectricity / totalElectricity) * 100).toFixed(2);
  }

  // Calculate Diversity Ratio = 100 × (Female employees ÷ Total employees) (%)
  if (totalEmployees > 0) {
    metrics.diversityRatio = ((femaleEmployees / totalEmployees) * 100).toFixed(2);
  }

  // Calculate Community Spend Ratio = 100 × (Community spend ÷ Total revenue) (%)
  if (totalRevenue > 0) {
    metrics.communitySpendRatio = ((communitySpend / totalRevenue) * 100).toFixed(6);
  }

  return metrics;
};

// Get summary data with calculated metrics
const getSummary = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get all responses grouped by year
    const responses = await prisma.response.findMany({
      where: { user_id: userId },
      include: {
        question: {
          select: {
            id: true,
            title: true,
            category: true
          }
        }
      },
      orderBy: { year: 'desc' }
    });

    if (responses.length === 0) {
      return res.json({
        yearlyData: [],
        message: 'No responses found'
      });
    }

    // Group responses by year
    const responsesByYear = responses.reduce((acc, response) => {
      if (!acc[response.year]) {
        acc[response.year] = [];
      }
      acc[response.year].push(response);
      return acc;
    }, {});

    // Calculate metrics for each year
    const yearlyData = Object.entries(responsesByYear).map(([year, yearResponses]) => {
      const metrics = calculateMetrics(yearResponses);
      return {
        year,
        ...metrics,
        responseCount: yearResponses.length
      };
    }).sort((a, b) => b.year.localeCompare(a.year)); // Sort by year descending

    // Get additional statistics
    const totalResponses = responses.length;
    const uniqueYears = Object.keys(responsesByYear).length;

    res.json({
      yearlyData,
      summary: {
        totalResponses,
        uniqueYears,
        latestYear: yearlyData[0]?.year || null
      }
    });

  } catch (error) {
    console.error('Error generating summary:', error);
    res.status(500).json({ error: 'Failed to generate summary' });
  }
};

// Get summary for a specific year
const getSummaryByYear = async (req, res) => {
  try {
    const userId = req.user.id;
    const { year } = req.params;

    const responses = await prisma.response.findMany({
      where: { 
        user_id: userId,
        year: year
      },
      include: {
        question: {
          select: {
            id: true,
            title: true,
            category: true,
            unit: true
          }
        }
      }
    });

    if (responses.length === 0) {
      return res.status(404).json({ error: 'No responses found for this year' });
    }

    const metrics = calculateMetrics(responses);

    // Group responses by category for detailed view
    const categorizedResponses = responses.reduce((acc, response) => {
      const category = response.question.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push({
        question: response.question.title,
        value: response.value,
        unit: response.question.unit
      });
      return acc;
    }, {});

    res.json({
      year,
      metrics,
      responses: categorizedResponses,
      responseCount: responses.length
    });

  } catch (error) {
    console.error('Error generating yearly summary:', error);
    res.status(500).json({ error: 'Failed to generate yearly summary' });
  }
};

module.exports = {
  getSummary,
  getSummaryByYear
};
