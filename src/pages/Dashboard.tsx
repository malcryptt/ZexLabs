import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useUserRole } from '@/hooks/useUserRole';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Plus, Upload, X } from 'lucide-react';

interface PackageItem {
  name: string;
  price: number;
  selected: boolean;
}

interface Transaction {
  id: string;
  sender_name: string;
  sender_email: string;
  phone_number?: string;
  amount: number;
  currency: string;
  packages_bought?: string[];
  payment_reference: string;
  payment_status: string;
  payment_method?: string;
  receipt_url?: string;
  created_at: string;
}

export default function Dashboard() {
  const { user } = useAuth();
  const { isAdmin, loading: roleLoading } = useUserRole(user?.id);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const [packages, setPackages] = useState<PackageItem[]>([
    { name: 'Mobile Development', price: 0, selected: false },
    { name: 'E-commerce', price: 0, selected: false },
    { name: 'Web Development', price: 0, selected: false },
    { name: 'Redesign', price: 0, selected: false },
    { name: 'Maintenance', price: 0, selected: false },
    { name: 'Domain', price: 0, selected: false },
    { name: 'Cyber Security', price: 0, selected: false },
  ]);

  const [formData, setFormData] = useState({
    sender_name: '',
    sender_email: '',
    phone_number: '',
    payment_reference: '',
    payment_status: 'pending',
    payment_method: '',
  });

  useEffect(() => {
    if (!roleLoading && user) {
      fetchTransactions();
    }
  }, [user, isAdmin, roleLoading]);

  const fetchTransactions = async () => {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTransactions(data || []);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handlePackageToggle = (index: number) => {
    const newPackages = [...packages];
    newPackages[index].selected = !newPackages[index].selected;
    setPackages(newPackages);
  };

  const handlePackagePriceChange = (index: number, price: string) => {
    const newPackages = [...packages];
    newPackages[index].price = parseFloat(price) || 0;
    setPackages(newPackages);
  };

  const calculateTotalAmount = () => {
    return packages
      .filter(pkg => pkg.selected)
      .reduce((sum, pkg) => sum + pkg.price, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAdmin) {
      toast({
        title: 'Unauthorized',
        description: 'Only admins can add transactions',
        variant: 'destructive'
      });
      return;
    }

    try {
      const selectedPackages = packages
        .filter(pkg => pkg.selected)
        .map(pkg => `${pkg.name} (₦${pkg.price.toLocaleString()})`);

      if (selectedPackages.length === 0) {
        toast({
          title: 'Validation Error',
          description: 'Please select at least one package',
          variant: 'destructive'
        });
        return;
      }

      let receiptUrl = null;

      // Upload file if provided
      if (uploadedFile) {
        const fileExt = uploadedFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `${user?.id}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('transaction-files')
          .upload(filePath, uploadedFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('transaction-files')
          .getPublicUrl(filePath);

        receiptUrl = publicUrl;
      }

      const totalAmount = calculateTotalAmount();

      const { error } = await supabase.from('transactions').insert({
        sender_name: formData.sender_name,
        sender_email: formData.sender_email,
        phone_number: formData.phone_number || null,
        amount: totalAmount,
        packages_bought: selectedPackages,
        payment_reference: formData.payment_reference,
        payment_status: formData.payment_status,
        payment_method: formData.payment_method || null,
        receipt_url: receiptUrl
      });

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Transaction added successfully'
      });

      // Reset form
      setFormData({
        sender_name: '',
        sender_email: '',
        phone_number: '',
        payment_reference: '',
        payment_status: 'pending',
        payment_method: '',
      });
      setPackages(packages.map(pkg => ({ ...pkg, selected: false, price: 0 })));
      setUploadedFile(null);

      setIsDialogOpen(false);
      fetchTransactions();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  if (loading || roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                {isAdmin ? 'Admin Dashboard' : 'My Transactions'}
              </h1>
              <p className="text-muted-foreground">
                {isAdmin 
                  ? 'Manage all client transactions' 
                  : 'View your transaction history'}
              </p>
            </div>
            {isAdmin && (
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-primary to-primary-glow">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Transaction
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Transaction</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="sender_name">Client Name *</Label>
                        <Input
                          id="sender_name"
                          required
                          value={formData.sender_name}
                          onChange={(e) => setFormData({ ...formData, sender_name: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="sender_email">Email *</Label>
                        <Input
                          id="sender_email"
                          type="email"
                          required
                          value={formData.sender_email}
                          onChange={(e) => setFormData({ ...formData, sender_email: e.target.value })}
                        />
                      </div>
                      <div className="col-span-2">
                        <Label htmlFor="phone_number">Phone Number *</Label>
                        <Input
                          id="phone_number"
                          required
                          value={formData.phone_number}
                          onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Package Selection */}
                    <div className="space-y-3">
                      <Label className="text-base font-semibold">Package Selected *</Label>
                      <div className="space-y-3 p-4 glass rounded-lg">
                        {packages.map((pkg, index) => (
                          <div key={pkg.name} className="flex items-center gap-4">
                            <Checkbox
                              id={`pkg-${index}`}
                              checked={pkg.selected}
                              onCheckedChange={() => handlePackageToggle(index)}
                            />
                            <Label htmlFor={`pkg-${index}`} className="flex-1 cursor-pointer">
                              {pkg.name}
                            </Label>
                            {pkg.selected && (
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">₦</span>
                                <Input
                                  type="number"
                                  placeholder="Price"
                                  className="w-32"
                                  value={pkg.price || ''}
                                  onChange={(e) => handlePackagePriceChange(index, e.target.value)}
                                  required
                                />
                              </div>
                            )}
                          </div>
                        ))}
                        <div className="pt-3 border-t border-border mt-3">
                          <div className="flex justify-between items-center text-lg font-semibold">
                            <span>Total Amount:</span>
                            <span className="text-accent">₦{calculateTotalAmount().toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* File Upload */}
                    <div>
                      <Label htmlFor="file_upload">Upload Receipt/Document</Label>
                      <div className="mt-2">
                        <input
                          id="file_upload"
                          type="file"
                          onChange={handleFileChange}
                          className="hidden"
                          accept="image/*,.pdf,.doc,.docx"
                        />
                        <label
                          htmlFor="file_upload"
                          className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors glass"
                        >
                          <Upload className="h-5 w-5" />
                          <span className="text-sm">
                            {uploadedFile ? uploadedFile.name : 'Click to upload or drag and drop'}
                          </span>
                        </label>
                        {uploadedFile && (
                          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                            <span>Selected: {uploadedFile.name}</span>
                            <button
                              type="button"
                              onClick={() => setUploadedFile(null)}
                              className="text-destructive hover:text-destructive/80"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="payment_reference">Payment Reference *</Label>
                        <Input
                          id="payment_reference"
                          required
                          value={formData.payment_reference}
                          onChange={(e) => setFormData({ ...formData, payment_reference: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="payment_status">Payment Status *</Label>
                        <select
                          id="payment_status"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          value={formData.payment_status}
                          onChange={(e) => setFormData({ ...formData, payment_status: e.target.value })}
                        >
                          <option value="pending">Pending</option>
                          <option value="uncomplete">Uncomplete</option>
                          <option value="completed">Completed</option>
                          <option value="failed">Failed</option>
                        </select>
                      </div>
                      <div className="col-span-2">
                        <Label htmlFor="payment_method">Payment Method</Label>
                        <Input
                          id="payment_method"
                          placeholder="e.g., Bank Transfer, Cash, Card"
                          value={formData.payment_method}
                          onChange={(e) => setFormData({ ...formData, payment_method: e.target.value })}
                        />
                      </div>
                    </div>
                    
                    <Button type="submit" className="w-full bg-gradient-to-r from-primary to-primary-glow">
                      Save Transaction
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            )}
          </div>

          <Card className="glass">
            <CardHeader>
              <CardTitle>Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              {transactions.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No transactions found</p>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Client Name</TableHead>
                        <TableHead>Email</TableHead>
                        {isAdmin && <TableHead>Phone</TableHead>}
                        <TableHead>Amount</TableHead>
                        <TableHead>Packages</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Reference</TableHead>
                        <TableHead>Date</TableHead>
                        {isAdmin && <TableHead>Receipt</TableHead>}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>{transaction.sender_name}</TableCell>
                          <TableCell>{transaction.sender_email}</TableCell>
                          {isAdmin && <TableCell>{transaction.phone_number || '-'}</TableCell>}
                          <TableCell>
                            {transaction.currency} {transaction.amount.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            {transaction.packages_bought?.join(', ') || '-'}
                          </TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded text-xs ${
                              transaction.payment_status === 'completed' 
                                ? 'bg-green-100 text-green-800' 
                                : transaction.payment_status === 'failed'
                                ? 'bg-red-100 text-red-800'
                                : transaction.payment_status === 'uncomplete'
                                ? 'bg-orange-100 text-orange-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {transaction.payment_status}
                            </span>
                          </TableCell>
                          <TableCell>{transaction.payment_reference}</TableCell>
                          <TableCell>
                            {new Date(transaction.created_at).toLocaleDateString()}
                          </TableCell>
                          {isAdmin && (
                            <TableCell>
                              {transaction.receipt_url ? (
                                <a 
                                  href={transaction.receipt_url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-primary hover:underline"
                                >
                                  View
                                </a>
                              ) : '-'}
                            </TableCell>
                          )}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
