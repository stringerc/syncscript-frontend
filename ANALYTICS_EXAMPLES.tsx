/**
 * ANALYTICS TRACKING EXAMPLES
 * Copy these patterns into your actual components
 */

import { analytics } from '@/lib/analytics'
import { useToast } from '@/components/Toast'

// ============================================================================
// EXAMPLE 1: Track Task Creation
// ============================================================================

export function CreateTaskModalExample() {
  const toast = useToast()
  const userId = 'user123' // Get from auth context

  const handleCreateTask = async (taskData: any) => {
    try {
      // Create task
      const task = await createTask(taskData)
      
      // 🎯 TRACK IT
      analytics.taskCreated(userId, task.id, {
        priority: task.priority,
        energyLevel: task.energy_level,
        hasBudget: !!task.budget,
        estimatedDuration: task.estimated_duration,
        source: 'manual'
      })
      
      toast.success('Task created!')
    } catch (error) {
      toast.error('Failed to create task')
    }
  }

  return null // Your component JSX here
}

// ============================================================================
// EXAMPLE 2: Track Task Completion
// ============================================================================

export function TaskListExample() {
  const userId = 'user123'

  const handleToggleComplete = async (taskId: string) => {
    const task = getTask(taskId)
    const startTime = task.created_at
    const endTime = new Date()
    const duration = (endTime.getTime() - new Date(startTime).getTime()) / 1000 / 60
    
    // Get energy state
    const energyBefore = getCurrentEnergy()
    
    // Complete task
    await completeTask(taskId)
    
    // Recalibrate energy
    const energyAfter = recalibrateEnergy(task)
    
    // 🎯 TRACK IT
    analytics.taskCompleted(userId, taskId, {
      actualDuration: duration,
      energyBefore,
      energyAfter,
      completedDuringPeak: isCurrentlyPeakWindow(),
      budgetVariance: task.budget ? calculateVariance(task) : undefined
    })
  }

  return null
}

// ============================================================================
// EXAMPLE 3: Track Energy Recalibration
// ============================================================================

export function EnergySystemExample() {
  const userId = 'user123'

  const recalibrateEnergy = (completedTask: any) => {
    const oldLevel = getCurrentEnergyLevel()
    const newLevel = calculateNewEnergy(completedTask)
    
    // Update state
    setEnergyLevel(newLevel)
    
    // 🎯 TRACK IT
    analytics.energyLevelUpdated(
      userId,
      oldLevel,
      newLevel,
      'auto_recalibration',
      0.85 // confidence from ML model
    )
    
    // Show UI feedback
    showEnergyChangeTooltip(oldLevel, newLevel)
    
    return newLevel
  }

  return null
}

// ============================================================================
// EXAMPLE 4: Track AI Suggestions
// ============================================================================

export function SmartSuggestionsExample() {
  const userId = 'user123'
  const [showExplanation, setShowExplanation] = useState(false)

  // When suggestions are generated
  useEffect(() => {
    if (suggestions.length > 0) {
      suggestions.forEach((suggestion, index) => {
        // 🎯 TRACK SHOWN
        analytics.aiSuggestionShown(
          userId,
          suggestion.id,
          suggestion.type,
          suggestion.confidence,
          suggestion.contextFactors
        )
      })
    }
  }, [suggestions])

  // When user accepts suggestion
  const handleAccept = (suggestion: any) => {
    const timeToDecision = Date.now() - suggestion.shownAt
    
    // 🎯 TRACK ACCEPTED
    analytics.aiSuggestionAccepted(
      userId,
      suggestion.id,
      timeToDecision / 1000
    )
    
    // Add task
    addTaskFromSuggestion(suggestion)
  }

  // When user views explanation
  const handleViewExplanation = () => {
    // 🎯 TRACK EXPLANATION VIEW
    analytics.aiExplanationViewed(userId, 'smart_suggestions', 'why')
    
    setShowExplanation(true)
  }

  return null
}

// ============================================================================
// EXAMPLE 5: Track Achievement Unlocks
// ============================================================================

export function AchievementSystemExample() {
  const userId = 'user123'

  const checkAchievements = (action: string) => {
    const newAchievements = evaluateAchievements(action)
    
    newAchievements.forEach(achievement => {
      // 🎯 TRACK UNLOCK
      analytics.achievementUnlocked(
        userId,
        achievement.id,
        achievement.name,
        achievement.points
      )
      
      // Show celebration
      showAchievementUnlockAnimation(achievement)
    })
  }

  return null
}

// ============================================================================
// EXAMPLE 6: Track Emblem Charge
// ============================================================================

export function EmblemSystemExample() {
  const userId = 'user123'

  const chargeEmblem = (emblemId: string, delta: number, reason: string) => {
    const currentCharge = getEmblemCharge(emblemId)
    const newCharge = currentCharge + delta
    
    // Update emblem
    setEmblemCharge(emblemId, newCharge)
    
    // 🎯 TRACK IT
    analytics.emblemCharged(
      userId,
      emblemId,
      delta,
      newCharge,
      reason
    )
    
    // Visual feedback
    animateEmblemCharge(emblemId, delta)
  }

  return null
}

// ============================================================================
// EXAMPLE 7: Track Budget Fit
// ============================================================================

export function BudgetFitExample() {
  const userId = 'user123'

  const calculateBudgetFit = (task: any) => {
    const fitScore = computeBudgetFitScore(task.cost, userBudget)
    const band = getComfortBand(fitScore)
    
    // 🎯 TRACK IT
    analytics.budgetFitCalculated(userId, task.id, fitScore, band)
    
    // Show in UI
    displayBudgetFit(fitScore, band)
  }

  return null
}

// ============================================================================
// EXAMPLE 8: Track Feature Discovery
// ============================================================================

export function FeatureMenuExample() {
  const userId = 'user123'

  const handleFeatureClick = (featureId: string) => {
    const isFirstTime = !hasUsedFeature(featureId)
    
    if (isFirstTime) {
      // 🎯 TRACK DISCOVERY
      analytics.featureDiscovered(userId, featureId, 'menu')
      
      // 🎯 TRACK FIRST USE
      analytics.featureFirstUse(userId, featureId)
      
      // Mark as used
      markFeatureAsUsed(featureId)
    }
    
    // Open feature
    openFeature(featureId)
  }

  return null
}

// ============================================================================
// EXAMPLE 9: Track User Registration (Auth0)
// ============================================================================

export function RegisterPageExample() {
  const handleRegisterComplete = async (user: any, method: string) => {
    // User created via Auth0
    const userId = user.sub
    const signupMethod = method // 'email', 'google', etc.
    const source = getUTMSource() || 'direct'
    
    // 🎯 TRACK REGISTRATION
    analytics.userRegistered(userId, signupMethod as any, source)
    
    // Redirect to onboarding
    router.push('/onboarding')
  }

  return null
}

// ============================================================================
// EXAMPLE 10: Track Premium Upgrade
// ============================================================================

export function PricingPageExample() {
  const userId = 'user123'

  const handleSelectPlan = (plan: string, billingPeriod: 'monthly' | 'annual') => {
    // 🎯 TRACK UPGRADE STARTED
    analytics.premiumUpgradeStarted(userId, plan, billingPeriod)
    
    // Redirect to checkout
    redirectToCheckout(plan, billingPeriod)
  }

  const handlePaymentSuccess = (plan: string, amount: number) => {
    // 🎯 TRACK UPGRADE COMPLETED
    analytics.premiumUpgradeCompleted(userId, plan, amount)
    
    // Show success
    toast.success('Welcome to Premium!')
  }

  return null
}

// ============================================================================
// HELPER FUNCTIONS (examples)
// ============================================================================

function getCurrentEnergyLevel() {
  // Get from state/context
  return 4
}

function recalibrateEnergy(task: any) {
  // Your energy calculation logic
  return 3
}

function isCurrentlyPeakWindow() {
  // Check if current time is in user's peak window
  return true
}

function calculateBudgetVariance(taskId: string) {
  // Calculate actual vs estimated cost
  return -10.5 // 10.5% under budget
}

function getTask(taskId: string) {
  // Get task from state
  return {} as any
}

function completeTask(taskId: string) {
  // Complete task logic
  return Promise.resolve()
}

function createTask(data: any) {
  // Create task logic
  return Promise.resolve({ id: 'task123', ...data })
}

function getCurrentEnergy() {
  return 4
}

function calculateNewEnergy(task: any) {
  return 3
}

function setEnergyLevel(level: number) {
  // Update state
}

function showEnergyChangeTooltip(oldLevel: number, newLevel: number) {
  // Show UI feedback
}

function computeBudgetFitScore(cost: number, budget: number) {
  return Math.min(100, (budget - cost) / budget * 100)
}

function getComfortBand(score: number): 'safe' | 'stretch' | 'over' {
  if (score >= 80) return 'safe'
  if (score >= 50) return 'stretch'
  return 'over'
}

function displayBudgetFit(score: number, band: string) {
  // Show in UI
}

function hasUsedFeature(featureId: string) {
  return false
}

function markFeatureAsUsed(featureId: string) {
  localStorage.setItem(`feature_${featureId}`, 'true')
}

function openFeature(featureId: string) {
  // Open feature modal/page
}

function getUTMSource() {
  const params = new URLSearchParams(window.location.search)
  return params.get('utm_source')
}

// Export examples (not used, just for reference)
export default {
  CreateTaskModalExample,
  TaskListExample,
  EnergySystemExample,
  SmartSuggestionsExample,
  AchievementSystemExample,
  EmblemSystemExample,
  BudgetFitExample,
  FeatureMenuExample,
  RegisterPageExample,
  PricingPageExample
}

