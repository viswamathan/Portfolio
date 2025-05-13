import React, { useState } from 'react';
import { Calculator, Download, ChevronDown, ChevronUp } from 'lucide-react';

const EngineeringCalculator = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [values, setValues] = useState({
    force: '',
    area: '',
    deltaLength: '',
    originalLength: '',
    youngsModulus: '',
    stress: '',
    strain: '',
    pressure: '',
    shearStress: '', // New field for shear stress
  });

  const calculateResults = () => {
    const force = parseFloat(values.force);
    const area = parseFloat(values.area);
    const deltaLength = parseFloat(values.deltaLength);
    const originalLength = parseFloat(values.originalLength);

    if (!isNaN(force) && !isNaN(area)) {
      const stress = force / area;
      const pressure = force / area;
      const shearStress = force / area; // Shear stress calculation
      setValues(prev => ({
        ...prev,
        stress: stress.toFixed(2),
        pressure: pressure.toFixed(2),
        shearStress: shearStress.toFixed(2),
      }));
    }

    if (!isNaN(deltaLength) && !isNaN(originalLength)) {
      const strain = deltaLength / originalLength;
      setValues(prev => ({ ...prev, strain: strain.toFixed(4) }));
    }

    if (values.stress && values.strain) {
      const E = parseFloat(values.stress) / parseFloat(values.strain);
      setValues(prev => ({ ...prev, youngsModulus: E.toFixed(2) }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const resetCalculator = () => {
    setValues({
      force: '',
      area: '',
      deltaLength: '',
      originalLength: '',
      youngsModulus: '',
      stress: '',
      strain: '',
      pressure: '',
      shearStress: '',
    });
  };

  const toggleSection = (section: string) => {
    setExpandedSection(prev => (prev === section ? null : section));
  };

  const generateReport = () => {
    const report = `Engineering Analysis Report
Date: ${new Date().toLocaleDateString()}

Stress Analysis:
- Force: ${values.force} N
- Area: ${values.area} m²
- Calculated Stress: ${values.stress} Pa

Pressure Analysis:
- Force: ${values.force} N
- Area: ${values.area} m²
- Calculated Pressure: ${values.pressure} Pa

Shear Stress Analysis:
- Force: ${values.force} N
- Area: ${values.area} m²
- Calculated Shear Stress: ${values.shearStress} Pa

Strain Analysis:
- Change in Length: ${values.deltaLength} m
- Original Length: ${values.originalLength} m
- Calculated Strain: ${values.strain}

Material Properties:
- Young's Modulus: ${values.youngsModulus} Pa
`;

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'engineering-analysis.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-purple-600 p-3 rounded-full shadow-lg hover:bg-purple-700 transition-colors"
      >
        <Calculator className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="absolute bottom-16 left-0 bg-gray-800 p-6 rounded-lg shadow-xl w-96">
          <h3 className="text-xl font-semibold mb-6">Engineering Calculator</h3>
          
          <div className="space-y-6">
            {/* Stress Section */}
            <div>
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection('stress')}
              >
                <h4 className="text-purple-500 font-semibold">Stress Calculator (σ = F/A)</h4>
                {expandedSection === 'stress' ? <ChevronUp /> : <ChevronDown />}
              </div>
              {expandedSection === 'stress' && (
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm mb-1">Force (N)</label>
                    <input
                      type="number"
                      name="force"
                      value={values.force}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 rounded px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                      placeholder="Enter force"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Area (m²)</label>
                    <input
                      type="number"
                      name="area"
                      value={values.area}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 rounded px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                      placeholder="Enter area"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Strain Section */}
            <div>
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection('strain')}
              >
                <h4 className="text-purple-500 font-semibold">Strain Calculator (ε = ΔL/L)</h4>
                {expandedSection === 'strain' ? <ChevronUp /> : <ChevronDown />}
              </div>
              {expandedSection === 'strain' && (
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm mb-1">ΔL (m)</label>
                    <input
                      type="number"
                      name="deltaLength"
                      value={values.deltaLength}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 rounded px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                      placeholder="Change in length"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">L (m)</label>
                    <input
                      type="number"
                      name="originalLength"
                      value={values.originalLength}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 rounded px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                      placeholder="Original length"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Results Section */}
            <div>
              <h4 className="text-purple-500 font-semibold">Results</h4>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="block text-sm mb-1">Stress (Pa)</label>
                  <input
                    type="text"
                    value={values.stress}
                    readOnly
                    className="w-full bg-gray-700 rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Strain</label>
                  <input
                    type="text"
                    value={values.strain}
                    readOnly
                    className="w-full bg-gray-700 rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Pressure (Pa)</label>
                  <input
                    type="text"
                    value={values.pressure}
                    readOnly
                    className="w-full bg-gray-700 rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Shear Stress (Pa)</label>
                  <input
                    type="text"
                    value={values.shearStress}
                    readOnly
                    className="w-full bg-gray-700 rounded px-3 py-2"
                  />
                </div>
              </div>
            </div>

            <div className="flex space-x-4 mt-6">
              <button
                onClick={calculateResults}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded transition-colors"
              >
                Calculate
              </button>
              <button
                onClick={resetCalculator}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded transition-colors"
              >
                Reset
              </button>
              <button
                onClick={generateReport}
                className="flex items-center justify-center space-x-2 px-4 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Report</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EngineeringCalculator;