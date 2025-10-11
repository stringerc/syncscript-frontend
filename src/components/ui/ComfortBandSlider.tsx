/**
 * ComfortBandSlider Component
 * WP-FIN-01: Budget Comfort Bands UI
 * 
 * Beautiful 3-handle slider for setting min/ideal/max spending
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ComfortBand, BudgetCategory } from '../../utils/budgetComfortBands';

interface ComfortBandSliderProps {
  category: BudgetCategory;
  initialBand: ComfortBand;
  onChange: (band: ComfortBand) => void;
}

export default function ComfortBandSlider({
  category,
  initialBand,
  onChange
}: ComfortBandSliderProps) {
  const [band, setBand] = useState<ComfortBand>(initialBand);
  const [dragging, setDragging] = useState<'min' | 'ideal' | 'max' | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  const minValue = 0;
  const maxValue = 500; // $500 max for slider
  
  useEffect(() => {
    setBand(initialBand);
  }, [initialBand]);
  
  const handleChange = (handle: 'min' | 'ideal' | 'max', newValue: number) => {
    const newBand = { ...band };
    
    // Constrain values to maintain min < ideal < max
    if (handle === 'min') {
      newBand.min = Math.min(newValue, band.ideal - 5);
    } else if (handle === 'ideal') {
      newBand.ideal = Math.max(band.min + 5, Math.min(newValue, band.max - 5));
    } else if (handle === 'max') {
      newBand.max = Math.max(newValue, band.ideal + 5);
    }
    
    // Round to nearest 5
    newBand.min = Math.round(newBand.min / 5) * 5;
    newBand.ideal = Math.round(newBand.ideal / 5) * 5;
    newBand.max = Math.round(newBand.max / 5) * 5;
    
    setBand(newBand);
    onChange(newBand);
  };
  
  const getPositionPercent = (value: number) => {
    return ((value - minValue) / (maxValue - minValue)) * 100;
  };
  
  return (
    <div style={{
      padding: '32px',
      background: '#F9FAFB',
      borderRadius: '16px',
      border: '1px solid #E5E7EB'
    }}>
      {/* Category Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '8px'
        }}>
          <span style={{ fontSize: '32px' }}>{category.icon}</span>
          <h3 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#1F2937',
            margin: 0
          }}>
            {category.name}
          </h3>
        </div>
        <p style={{
          fontSize: '14px',
          color: '#6B7280',
          margin: 0
        }}>
          {category.description}
        </p>
      </div>
      
      {/* Current Values Display */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px',
        marginBottom: '32px'
      }}>
        <div style={{
          background: 'white',
          padding: '16px',
          borderRadius: '12px',
          border: '2px solid #3B82F6',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '4px', fontWeight: '600' }}>
            MIN
          </div>
          <div style={{ fontSize: '28px', fontWeight: '800', color: '#3B82F6' }}>
            ${band.min}
          </div>
          <div style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '4px' }}>
            {category.examples.low}
          </div>
        </div>
        
        <div style={{
          background: 'white',
          padding: '16px',
          borderRadius: '12px',
          border: '2px solid #10B981',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '4px', fontWeight: '600' }}>
            IDEAL
          </div>
          <div style={{ fontSize: '28px', fontWeight: '800', color: '#10B981' }}>
            ${band.ideal}
          </div>
          <div style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '4px' }}>
            {category.examples.ideal}
          </div>
        </div>
        
        <div style={{
          background: 'white',
          padding: '16px',
          borderRadius: '12px',
          border: '2px solid #F59E0B',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '4px', fontWeight: '600' }}>
            MAX
          </div>
          <div style={{ fontSize: '28px', fontWeight: '800', color: '#F59E0B' }}>
            ${band.max}
          </div>
          <div style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '4px' }}>
            {category.examples.high}
          </div>
        </div>
      </div>
      
      {/* Slider */}
      <div style={{ padding: '0 12px' }}>
        <div
          ref={sliderRef}
          style={{
            position: 'relative',
            height: '60px',
            marginBottom: '16px'
          }}
        >
          {/* Track Background */}
          <div style={{
            position: 'absolute',
            top: '28px',
            left: 0,
            right: 0,
            height: '4px',
            background: '#E5E7EB',
            borderRadius: '2px'
          }} />
          
          {/* Colored Zones */}
          <div style={{
            position: 'absolute',
            top: '28px',
            left: `${getPositionPercent(band.min)}%`,
            width: `${getPositionPercent(band.ideal) - getPositionPercent(band.min)}%`,
            height: '4px',
            background: 'linear-gradient(90deg, #3B82F6 0%, #10B981 100%)',
            borderRadius: '2px'
          }} />
          
          <div style={{
            position: 'absolute',
            top: '28px',
            left: `${getPositionPercent(band.ideal)}%`,
            width: `${getPositionPercent(band.max) - getPositionPercent(band.ideal)}%`,
            height: '4px',
            background: 'linear-gradient(90deg, #10B981 0%, #F59E0B 100%)',
            borderRadius: '2px'
          }} />
          
          {/* Min Handle */}
          <motion.div
            drag="x"
            dragConstraints={sliderRef}
            dragElastic={0}
            dragMomentum={false}
            onDragStart={() => setDragging('min')}
            onDragEnd={() => setDragging(null)}
            onDrag={(e, info) => {
              if (!sliderRef.current) return;
              const rect = sliderRef.current.getBoundingClientRect();
              const percent = ((info.point.x - rect.left) / rect.width) * 100;
              const value = minValue + (percent / 100) * (maxValue - minValue);
              handleChange('min', Math.max(minValue, Math.min(value, maxValue)));
            }}
            whileHover={{ scale: 1.2 }}
            whileDrag={{ scale: 1.3 }}
            style={{
              position: 'absolute',
              left: `${getPositionPercent(band.min)}%`,
              top: '16px',
              width: '28px',
              height: '28px',
              background: 'white',
              border: '3px solid #3B82F6',
              borderRadius: '50%',
              cursor: 'grab',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
              transform: 'translateX(-50%)',
              zIndex: dragging === 'min' ? 10 : 3
            }}
          >
            <div style={{
              position: 'absolute',
              top: '-32px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#3B82F6',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '700',
              whiteSpace: 'nowrap',
              opacity: dragging === 'min' ? 1 : 0,
              transition: 'opacity 0.2s'
            }}>
              ${band.min}
            </div>
          </motion.div>
          
          {/* Ideal Handle */}
          <motion.div
            drag="x"
            dragConstraints={sliderRef}
            dragElastic={0}
            dragMomentum={false}
            onDragStart={() => setDragging('ideal')}
            onDragEnd={() => setDragging(null)}
            onDrag={(e, info) => {
              if (!sliderRef.current) return;
              const rect = sliderRef.current.getBoundingClientRect();
              const percent = ((info.point.x - rect.left) / rect.width) * 100;
              const value = minValue + (percent / 100) * (maxValue - minValue);
              handleChange('ideal', Math.max(minValue, Math.min(value, maxValue)));
            }}
            whileHover={{ scale: 1.2 }}
            whileDrag={{ scale: 1.3 }}
            style={{
              position: 'absolute',
              left: `${getPositionPercent(band.ideal)}%`,
              top: '16px',
              width: '28px',
              height: '28px',
              background: 'white',
              border: '3px solid #10B981',
              borderRadius: '50%',
              cursor: 'grab',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
              transform: 'translateX(-50%)',
              zIndex: dragging === 'ideal' ? 10 : 4
            }}
          >
            <div style={{
              position: 'absolute',
              top: '-32px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#10B981',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '700',
              whiteSpace: 'nowrap',
              opacity: dragging === 'ideal' ? 1 : 0,
              transition: 'opacity 0.2s'
            }}>
              ${band.ideal}
            </div>
          </motion.div>
          
          {/* Max Handle */}
          <motion.div
            drag="x"
            dragConstraints={sliderRef}
            dragElastic={0}
            dragMomentum={false}
            onDragStart={() => setDragging('max')}
            onDragEnd={() => setDragging(null)}
            onDrag={(e, info) => {
              if (!sliderRef.current) return;
              const rect = sliderRef.current.getBoundingClientRect();
              const percent = ((info.point.x - rect.left) / rect.width) * 100;
              const value = minValue + (percent / 100) * (maxValue - minValue);
              handleChange('max', Math.max(minValue, Math.min(value, maxValue)));
            }}
            whileHover={{ scale: 1.2 }}
            whileDrag={{ scale: 1.3 }}
            style={{
              position: 'absolute',
              left: `${getPositionPercent(band.max)}%`,
              top: '16px',
              width: '28px',
              height: '28px',
              background: 'white',
              border: '3px solid #F59E0B',
              borderRadius: '50%',
              cursor: 'grab',
              boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
              transform: 'translateX(-50%)',
              zIndex: dragging === 'max' ? 10 : 2
            }}
          >
            <div style={{
              position: 'absolute',
              top: '-32px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#F59E0B',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '700',
              whiteSpace: 'nowrap',
              opacity: dragging === 'max' ? 1 : 0,
              transition: 'opacity 0.2s'
            }}>
              ${band.max}
            </div>
          </motion.div>
        </div>
        
        {/* Scale Labels */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '12px',
          color: '#9CA3AF',
          paddingTop: '8px'
        }}>
          <span>$0</span>
          <span>$100</span>
          <span>$200</span>
          <span>$300</span>
          <span>$400</span>
          <span>$500</span>
        </div>
      </div>
      
      {/* Budget Fit Examples */}
      <div style={{
        marginTop: '32px',
        padding: '20px',
        background: 'white',
        borderRadius: '12px',
        border: '1px solid #E5E7EB'
      }}>
        <h4 style={{
          fontSize: '14px',
          fontWeight: '700',
          color: '#4B5563',
          marginBottom: '16px'
        }}>
          How recommendations will be scored:
        </h4>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '20px' }}>⭐⭐⭐⭐⭐</span>
            <span style={{ fontSize: '14px', color: '#6B7280' }}>
              ${band.min}-${band.ideal} (Great fit!)
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '20px' }}>⭐⭐⭐</span>
            <span style={{ fontSize: '14px', color: '#6B7280' }}>
              ${band.ideal}-${band.max} (OK, pricier)
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '20px' }}>⭐</span>
            <span style={{ fontSize: '14px', color: '#6B7280' }}>
              ${band.max}+ (Over budget)
            </span>
          </div>
        </div>
      </div>
      
      {/* Pro Tip */}
      <p style={{
        marginTop: '20px',
        fontSize: '13px',
        color: '#6B7280',
        fontStyle: 'italic',
        textAlign: 'center'
      }}>
        💡 Tip: Set &quot;ideal&quot; to what you&apos;re comfortable spending regularly
      </p>
    </div>
  );
}

