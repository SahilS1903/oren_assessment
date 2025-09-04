import React, { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import api from '../services/api';
import { Save, Calculator } from 'lucide-react';

const Questionnaire = () => {
  const [selectedYear, setSelectedYear] = useState('2024-25');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();

  const watchedValues = watch();

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await api.get('/questions');
      setQuestions(response.data);
      
      // Fetch existing responses for the selected year
      const responsesResponse = await api.get(`/responses?year=${selectedYear}`);
      const existingResponses = responsesResponse.data;
      
      // Pre-fill form with existing responses
      existingResponses.forEach(response => {
        setValue(`question_${response.question_id}`, response.value);
      });
    } catch (error) {
      console.error('Error fetching questions:', error);
      toast.error('Failed to load questionnaire');
    } finally {
      setLoading(false);
    }
  };

  const calculatedMetrics = useMemo(() => {
    const metrics = {};

    // Get values for calculations
    const carbonEmissions = parseFloat(watchedValues.question_4) || 0;
    const totalRevenue = parseFloat(watchedValues.question_11) || 0;
    const renewableElectricity = parseFloat(watchedValues.question_2) || 0;
    const totalElectricity = parseFloat(watchedValues.question_1) || 0;
    const femaleEmployees = parseFloat(watchedValues.question_6) || 0;
    const totalEmployees = parseFloat(watchedValues.question_5) || 0;
    const communitySpend = parseFloat(watchedValues.question_8) || 0;

    // Carbon Intensity = Carbon emissions ÷ Total revenue (T CO₂e / INR)
    if (totalRevenue > 0) {
      metrics.carbonIntensity = (carbonEmissions / totalRevenue).toFixed(6);
    }

    // Renewable Electricity Ratio = 100 × (Renewable electricity ÷ Total electricity) (%)
    if (totalElectricity > 0) {
      metrics.renewableRatio = ((renewableElectricity / totalElectricity) * 100).toFixed(2);
    }

    // Diversity Ratio = 100 × (Female employees ÷ Total employees) (%)
    if (totalEmployees > 0) {
      metrics.diversityRatio = ((femaleEmployees / totalEmployees) * 100).toFixed(2);
    }

    // Community Spend Ratio = 100 × (Community spend ÷ Total revenue) (%)
    if (totalRevenue > 0) {
      metrics.communitySpendRatio = ((communitySpend / totalRevenue) * 100).toFixed(6);
    }

    return metrics;
  }, [
    watchedValues.question_1,
    watchedValues.question_2,
    watchedValues.question_4,
    watchedValues.question_5,
    watchedValues.question_6,
    watchedValues.question_8,
    watchedValues.question_11
  ]);

  const onSubmit = async (data) => {
    try {
      const responses = [];
      
      questions.forEach(question => {
        const value = data[`question_${question.id}`];
        if (value !== undefined && value !== '') {
          responses.push({
            question_id: question.id,
            year: selectedYear,
            value: question.type === 'dropdown' ? value : parseFloat(value) || 0
          });
        }
      });

      await api.post('/responses', { responses });
      toast.success('Responses saved successfully!');
    } catch (error) {
      console.error('Error saving responses:', error);
      toast.error('Failed to save responses');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const categorizedQuestions = questions.reduce((acc, question) => {
    if (!acc[question.category]) {
      acc[question.category] = [];
    }
    acc[question.category].push(question);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">ESG Questionnaire</h1>
            <p className="text-gray-600 mt-1">
              Complete your Environmental, Social, and Governance metrics
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="2024-25">2024-25</option>
              <option value="2023-24">2023-24</option>
              <option value="2022-23">2022-23</option>
            </select>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Questions by Category */}
        {Object.entries(categorizedQuestions).map(([category, categoryQuestions]) => (
          <div key={category} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 capitalize">
              {category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categoryQuestions.map((question) => (
                <div key={question.id}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {question.title}
                    {question.unit && <span className="text-gray-500"> ({question.unit})</span>}
                  </label>
                  {question.type === 'dropdown' ? (
                    <select
                      {...register(`question_${question.id}`, { required: 'This field is required' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">Select an option</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  ) : (
                    <input
                      type="number"
                      step="any"
                      {...register(`question_${question.id}`, { 
                        required: 'This field is required',
                        min: { value: 0, message: 'Value must be positive' }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter value"
                    />
                  )}
                  {errors[`question_${question.id}`] && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors[`question_${question.id}`].message}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Calculated Metrics */}
        <div className="bg-gradient-to-r from-primary-50 to-green-50 rounded-lg shadow-sm p-6 border border-primary-200">
          <div className="flex items-center mb-4">
            <Calculator className="h-5 w-5 text-primary-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Real-time Calculated Metrics</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h3 className="text-sm font-medium text-gray-700">Carbon Intensity</h3>
              <p className="text-lg font-semibold text-gray-900">
                {calculatedMetrics.carbonIntensity || '0.000000'}
              </p>
              <p className="text-xs text-gray-500">T CO₂e / INR</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h3 className="text-sm font-medium text-gray-700">Renewable Electricity Ratio</h3>
              <p className="text-lg font-semibold text-gray-900">
                {calculatedMetrics.renewableRatio || '0.00'}%
              </p>
              <p className="text-xs text-gray-500">Renewable / Total</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h3 className="text-sm font-medium text-gray-700">Diversity Ratio</h3>
              <p className="text-lg font-semibold text-gray-900">
                {calculatedMetrics.diversityRatio || '0.00'}%
              </p>
              <p className="text-xs text-gray-500">Female / Total Employees</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h3 className="text-sm font-medium text-gray-700">Community Spend Ratio</h3>
              <p className="text-lg font-semibold text-gray-900">
                {calculatedMetrics.communitySpendRatio || '0.000000'}%
              </p>
              <p className="text-xs text-gray-500">Community Spend / Revenue</p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
          >
            <Save className="h-4 w-4" />
            <span>Save Responses</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Questionnaire;
