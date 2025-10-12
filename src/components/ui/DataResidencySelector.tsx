/**
 * Feature #97: Data Residency
 * Regional data storage for compliance
 */

'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Globe, CheckCircle, Shield, Server, MapPin } from 'lucide-react'
import { dataRegions, DataRegion } from '../../utils/enterpriseFeatures'

const DataResidencySelector: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<DataRegion>(dataRegions[0])

  return (
    <div className="h-full bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Globe className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Data Residency</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Regional data storage</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dataRegions.map(region => (
            <motion.div
              key={region.id}
              onClick={() => setSelectedRegion(region)}
              className={`bg-white dark:bg-gray-800 rounded-xl p-6 cursor-pointer transition-all ${
                selectedRegion.id === region.id
                  ? 'ring-2 ring-blue-500'
                  : 'hover:shadow-lg'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <Server className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                {selectedRegion.id === region.id && (
                  <CheckCircle className="w-6 h-6 text-green-500" />
                )}
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-1">{region.name}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                <MapPin className="w-4 h-4" />
                {region.location}
              </div>
              <div className="flex flex-wrap gap-2">
                {region.compliance.map(cert => (
                  <span
                    key={cert}
                    className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded flex items-center gap-1"
                  >
                    <Shield className="w-3 h-3" />
                    {cert}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DataResidencySelector

